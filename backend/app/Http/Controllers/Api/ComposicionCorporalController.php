<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ComposicionCorporalCollection;
use App\Models\ComposicionCorporal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComposicionCorporalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ComposicionCorporalCollection
     */
    public function index()
    {
        return new ComposicionCorporalCollection(ComposicionCorporal::paginate(15));
    }

    public function indexById(Request $request)
    {
        $atletaId = $request->input('atleta_id');
        $composicioncorporal = ComposicionCorporal::where('atleta_id', $atletaId)->get();
        return new ComposicionCorporalCollection($composicioncorporal);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fecha' => ['required', 'date'],
            'altura' => ['required', 'numeric'],
            'peso' => ['required', 'numeric'],
            'atleta_id' => ['required', 'exists:users,id']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 400);
        }

        $composicionCorporal = ComposicionCorporal::create($request->all());

        return response()->json([
            'message' => 'Composicion corporal creada exitosamente',
            'data' => $composicionCorporal
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ComposicionCorporal $composicioncorporal)
    {
        return response()->json($composicioncorporal, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ComposicionCorporal $composicioncorporal)
    {
        $validator = Validator::make($request->all(), [
            'fecha' => ['date'],
            'altura' => ['numeric'],
            'peso' => ['numeric'],
            'atleta_id' => ['exists:users,id']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 400);
        }

        $composicioncorporal->update($request->all());

        return response()->json([
            'message' => 'Composicion corporal actualizada exitosamente',
            'data' => $composicioncorporal
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ComposicionCorporal $composicioncorporal)
    {
        ComposicionCorporal::where('id', $composicioncorporal->id)->delete();

        return $this->displayMessage('La composición corporal has sido borrada', 200, 'Status');
    }

}
