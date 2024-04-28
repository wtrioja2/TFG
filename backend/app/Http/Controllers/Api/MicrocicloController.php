<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Microciclo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MicrocicloCollection;

class MicrocicloController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return MicrocicloCollection
     */
    public function index()
    {
        return new MicrocicloCollection(Microciclo::paginate(15));
    }

    public function indexById(Request $request)
    {
        $atletaId = $request->input('atleta_id');
        $microciclos = Microciclo::where('atleta_id', $atletaId)->get();
        return new MicrocicloCollection($microciclos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'semana' => ['required'],
            'nombre' => ['required'],
            'atleta_id' => ['required'],
            'mesociclo_id' => ['required'],
        ]);

        // Manejar errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Algunos campos son obligatorios.',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Crear un nuevo microciclo
        $microciclo = Microciclo::create($request->all());

        return response()->json([
            'data' => $microciclo,
            'message' => 'Microciclo creado exitosamente.',
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $microciclo = Microciclo::find($id);

        if ($microciclo) {
            return response()->json($microciclo, 200);
        } else {
            return response()->json(['message' => 'Microciclo no encontrado'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Microciclo  $microciclo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Microciclo $microciclo)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'semana' => [],
            'nombre' => [],
            'atleta_id' => [],
            'mesociclo_id' => [],
        ]);

        // Manejar errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Actualizar los campos necesarios del microciclo
        $microciclo->update($request->all());

        return response()->json([
            'data' => $microciclo,
            'message' => 'Microciclo actualizado exitosamente.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Microciclo  $microciclo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Microciclo $microciclo)
    {
        $microciclo->delete();

        return response()->json(['message' => 'El microciclo se ha borrado!'], 200);
    }
}
