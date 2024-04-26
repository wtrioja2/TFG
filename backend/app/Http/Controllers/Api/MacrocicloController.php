<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Macrociclo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MacrocicloCollection;

class MacrocicloController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return MacrocicloCollection
     */
    public function index()
    {
        return new MacrocicloCollection(Macrociclo::paginate(15));
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
            'año' => ['required'],
            'nombre' => ['required'],
            'atleta_id' => ['required'],
        ]);

        // Manejar errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Algunos campos son obligatorios.',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Crear un nuevo macrociclo
        $macrociclo = Macrociclo::create($request->all());

        return response()->json([
            'data' => $macrociclo,
            'message' => 'Macrociclo creado exitosamente.',
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
        $macrociclo = Macrociclo::find($id);

        if ($macrociclo) {
            return response()->json($macrociclo, 200);
        } else {
            return response()->json(['message' => 'Macrociclo no encontrado'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Macrociclo  $macrociclo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Macrociclo $macrociclo)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'año' => [],
            'nombre' => [],
            'atleta_id' => [],
        ]);

        // Manejar errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Actualizar los campos necesarios del macrociclo
        $macrociclo->update($request->all());

        return response()->json([
            'data' => $macrociclo,
            'message' => 'Macrociclo actualizado exitosamente.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Macrociclo  $macrociclo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Macrociclo $macrociclo)
    {
        $macrociclo->delete();

        return response()->json(['message' => 'El macrociclo se ha borrado!'], 200);
    }
}
