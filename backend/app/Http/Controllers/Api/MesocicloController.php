<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mesociclo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MesocicloCollection;

class MesocicloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return MesocicloCollection
     *
     */
    public function index()
    {
        return new MesocicloCollection(Mesociclo::paginate(15));
    }

    public function indexById(Request $request)
    {
        $atletaId = $request->input('atleta_id');
        $mesociclos = Mesociclo::where('atleta_id', $atletaId)->get();
        return new MesocicloCollection($mesociclos);
    }

    public function indexByAtletaAndMacrociclo(Request $request)
    {
        $atletaId = $request->input('atleta_id');
        $macrocicloId = $request->input('macrociclo_id');

        // Aquí asumo que tienes una relación entre Mesociclo y Macrociclo en tus modelos
        // Puedes ajustar esto según la estructura de tus modelos
        $mesociclos = Mesociclo::where('atleta_id', $atletaId)
            ->whereHas('macrociclo', function ($query) use ($macrocicloId) {
                $query->where('id', $macrocicloId);
            })
            ->get();

        return new MesocicloCollection($mesociclos);
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
            'mes' => [],
            'nombre' => ['required'],
            'atleta_id' => ['required'],
            'macrociclo_id' => ['required'],
        ]);

        // Manejar errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Algunos campos son obligatorios.',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Crear un nuevo mesociclo
        $mesociclo = Mesociclo::create($request->all());

        return response()->json([
            'data' => $mesociclo,
            'message' => 'Mesociclo creado exitosamente.',
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
        $mesociclo = Mesociclo::find($id);

        if ($mesociclo) {
            return response()->json($mesociclo, 200);
        } else {
            return response()->json(['message' => 'Mesociclo no encontrado'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mesociclo  $mesociclo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mesociclo $mesociclo)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'mes' => [],
            'nombre' => [],
            'atleta_id' => [],
            'macrociclo_id' => [],
        ]);

        // Manejar errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Actualizar los campos necesarios del mesociclo
        $mesociclo->update($request->all());

        return response()->json([
            'data' => $mesociclo,
            'message' => 'Mesociclo actualizado exitosamente.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mesociclo  $mesociclo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Mesociclo $mesociclo)
    {
        $mesociclo->delete();

        return response()->json(['message' => 'El mesociclo se ha borrado!'], 200);
    }
}
