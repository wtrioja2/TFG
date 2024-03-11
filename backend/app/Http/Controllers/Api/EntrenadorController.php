<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EntrenadorCollection;
use App\Models\Entrenador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;

class EntrenadorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new EntrenadorCollection(Entrenador::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Create the validator
        $validator = Validator::make($request->all(), [
            'user_id' => ['required', 'exists:users,id'],
            'avatar' => ['image', 'max:2048'],
            'iban' => ['nullable', 'max:24'],
            'informacion' => ['nullable', 'string', 'max:400']
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json([
                'message' => 'There are some fields that are required or invalid!',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Store the avatar image
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');

            if ($avatar->getSize() > 2000000) {
                $compressedImage = Image::make($avatar)->encode('jpg', 75);
                $avatarName = uniqid() . '.jpg';
                Storage::put('avatars/' . $avatarName, $compressedImage->stream());
            } else {
                $avatarName = uniqid() . '.' . $avatar->getClientOriginalExtension();
                $avatar->storeAs('avatars', $avatarName);
            }
        }

        // Create the trainer
        $trainer = Entrenador::create([
            'user_id' => $request->user_id,
            'avatar' => $avatarName ?? null,
            'iban' => $request->iban ?? null,
            'informacion' => $request->informacion ?? null
        ]);

        // Successful response
        return response()->json([
            'data' => $trainer,
            'message' => 'Entrenador guardado!',
        ], 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Entrenador  $entrenador
     * @return \Illuminate\Http\Response
     */
    public function show(Entrenador $entrenador)
    {
        return response()->json($entrenador, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Entrenador  $entrenador
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Entrenador $entrenador)
    {
        $validator = Validator::make($request->all(), [
            // Aquí defines las reglas de validación para los campos del entrenador
            // Por ejemplo: 'iban' => ['string', 'max:24'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $entrenador->update($request->all());

        return new EntrenadorResource($entrenador);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Entrenador  $entrenador
     * @return \Illuminate\Http\Response
     */
    public function destroy(Entrenador $entrenador)
    {
        $entrenador->delete();

        return response()->json([
            'message' => 'Entrenador deleted successfully',
        ], 200);
    }
}
