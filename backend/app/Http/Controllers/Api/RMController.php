<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RMCollection;
use App\Models\RM;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class RMController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new RMCollection(RM::paginate(12));
    }

    public function indexById(Request $request)
    {
        $atletaId = $request->input('atleta_id');
        $rms = RM::where('atleta_id', $atletaId)->get()->map(function ($rm) {
            return [
                'id' => $rm->id,
                'ejercicio_id' => $rm->ejercicio_id,
                'fecha' => $rm->fecha,
                'rm' => $rm->rm,
            ];
        });

        return $rms->toArray();
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
        'fecha' => 'required|date_format:d-m-Y', // Asegura que la fecha esté en el formato correcto
        'rm' => 'required|numeric',
        'ejercicio_id' => 'required|exists:ejercicios,id',
        'atleta_id' => 'required|exists:atletas,id',
        ]);

        // Comprobar si hay errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Formatear la fecha en el formato deseado ("día-mes-año")
        $fecha = Carbon::createFromFormat('d-m-Y', $request->fecha)->format('Y-m-d');

        // Crear el registro de RM
        $rm = RM::create([
            'fecha' => $fecha,
            'rm' => $request->rm,
            'ejercicio_id' => $request->ejercicio_id,
            'atleta_id' => $request->atleta_id,
        ]);

        // Devolver la respuesta con el nuevo registro creado
        return response()->json([
            'data' => $rm,
            'message' => 'RM created successfully'
        ], 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(RM $rm)
    {
        return response()->json($rm, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RM $rm)
    {
       // Validar los datos de entrada
       $validator = Validator::make($request->all(), [
        'fecha' => 'required|date_format:d-m-Y',
        'rm' => 'numeric',
        'ejercicio_id' => 'exists:ejercicios,id',
        'atleta_id' => 'exists:atletas,id',
        ]);

        // Comprobar si hay errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Formatear la fecha en el formato deseado ("día-mes-año")
        $fecha = Carbon::createFromFormat('d-m-Y', $request->fecha)->format('Y-m-d');

        // Actualizar los campos proporcionados en la solicitud
        $rm->update([
            'fecha' => $fecha,
            'rm' => $request->rm,
            'ejercicio_id' => $request->ejercicio_id,
            'atleta_id' => $request->atleta_id,
        ]);

        // Devolver la respuesta con el registro actualizado
        return response()->json([
            'data' => $rm,
            'message' => 'RM updated successfully'
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(RM $rm)
    {

        RM::where('id', $rm->id)->delete();

        return $this->displayMessage('The RM was successfully deleted!', 200, 'Status');
    }
}
