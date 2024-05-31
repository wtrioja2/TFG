<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EntrenadorCollection;
use App\Http\Resources\AtletaCollection;
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
     * @return EntrenadorCollection
     */
    public function index()
    {
        return new EntrenadorCollection(Entrenador::paginate(12));
    }

    public function indexByUserId(Request $request)
    {
        $userId = $request->input('user_id');

        $entrenador = Entrenador::where('user_id', $userId)->first();

        if (!$entrenador) {
            return response()->json(['message' => 'Entrenador no encontrado'], 404);
        }

        return response()->json(['data' => $entrenador], 200);
    }

    public function indexTotalEntrenadores()
    {
        $entrenadores = Entrenador::all()->map(function ($entrenador) {
            return [
                'id' => $entrenador->id,
                'apodo' => $entrenador->apodo,
                'user_id' => $entrenador->user_id,
            ];
        });

        return $entrenadores->toArray();
    }

    /**
     * Get all the athletes associated with a specific trainer.
     *
     * @param  \App\Models\Entrenador  $entrenador
     * @return \Illuminate\Http\Response
     */
    public function getAtletas(Entrenador $entrenador)
    {
        $atletas = $entrenador->atletas;
        return new AtletaCollection($atletas);
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
            'apodo' => ['required'],
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
            'apodo' => $request->apodo,
            'user_id' => $request->user_id,
            'avatar' => $avatarName ?? null,
            'iban' => $request->iban ?? null,
            'informacion' => $request->informacion ?? null
        ]);

        // Asociar atletas si se especifican en la solicitud
        if ($request->has('atletas_ids')) {
            $trainer->atletas()->attach($request->atletas_ids);
        }

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
         // Define las reglas de validación para los campos actualizables
         $rules = [
            'apodo' => ['required'],
            'user_id' => ['required', 'exists:users,id'],
            'informacion' => ['nullable', 'string']
            // Agrega aquí las reglas de validación para otros campos que puedan ser actualizados
        ];

        // Valida los datos proporcionados en la solicitud
        $validator = Validator::make($request->all(), $rules);

        // Verifica si la validación falla
        if ($validator->fails()) {
            return response()->json([
                'message' => 'There are some fields that are required!',
                'errors' => $validator->errors(),
            ]);
        }
        // Asociar atletas si se especifican en la solicitud
        if ($request->has('atletas_ids')) {
            $entrenador->atletas()->sync($request->atletas_ids);
        }

        // Prepara los datos para actualizar
        $updateData = [
            'apodo' => $request->apodo,
            'user_id' => $request->user_id,
            'informacion' => $request->informacion,
        ];

        // Actualiza el avatar si se proporciona uno nuevo
        if ($request->hasFile('avatar')) {
            // Elimina el avatar anterior si existe
            if ($entrenador->avatar) {
                Storage::delete('avatars/' . $entrenador->avatar);
            }

            // Guarda el nuevo avatar
            $avatar = $request->file('avatar');
            $avatarName = uniqid() . '.' . $avatar->getClientOriginalExtension();
            $avatar->storeAs('avatars', $avatarName);

            // Agrega el avatar al arreglo de datos para actualizar
            $updateData['avatar'] = $avatarName;
        }

        $entrenador->update($updateData);

        // Respuesta exitosa
        return response()->json([
            'data' => $entrenador,
            'message' => 'Entrenador actualizado!',
        ], 200);
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
