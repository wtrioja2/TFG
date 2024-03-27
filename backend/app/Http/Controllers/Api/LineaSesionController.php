<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LineaSesionCollection;
use App\Models\LineaSesion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class LineaSesionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return LineaSesionCollection
     */
    public function index(Request $request)
    {
        $fecha = $request->input('fecha');
        $query = $fecha ? LineaSesion::where('fecha', $fecha) : LineaSesion::query();

        return new LineaSesionCollection($query->paginate(10));
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
        $validator = Validator::make($request->all(),[
            'fecha' => ['required'],
            'atleta_id' => ['required'],
            'ejercicio_id' => ['required'],
            'sesion_id' => ['required'],
            'series' => ['required'],
            'repeticiones' => ['required'],
            'kilos' => [],
            'tiempo_esfuerzo' => [],
            'tiempo_descanso' => [],
            'velocidad' => [],
            'comentario' => [],
        ]);

        // Block or catch any validation failure if there are any
        if ($validator->fails()){
            return response()->json([
                'message' => 'There are some fields that are required!',
                'errors' => $validator->errors(),
            ]);
        }

        // Add the request data
        $requestData = array_merge($request->all());

        // Create ejercicio
        $lineaSesion = LineaSesion::create($requestData);

        return response()->json([
            'data' => $lineaSesion,
            'message' => 'Ejercicio guardado!'
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(LineaSesion $lineassesion)
    {
        return response()->json($lineassesion, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LineaSesion $lineassesion)
    {
      // Count the requests
      if(count($request->all())< 1){
        return $this->displayMessage('Envía al menos un campo para actualizar la línea de sesión');
    }
    // Initializa reques data variable
    $requestData = [];

    if (!empty($request->fecha)){
        $requestData['fecha'] = $request->fecha;
    }
    if (!empty($request->series)){
        $requestData['series'] = $request->series;
    }
    if (!empty($request->repeticiones)){
        $requestData['repeticiones'] = $request->repeticiones;
    }
    if (!empty($request->kilos)){
        $requestData['kilos'] = $request->kilos;
    }
    if (!empty($request->comentario)){
        $requestData['comentario'] = $request->comentario;
    }
    if (!empty($request->atleta_id)){
        $requestData['atleta_id'] = $request->atleta_id;
    }
    if (!empty($request->ejercicio_id)){
        $requestData['ejercicio_id'] = $request->ejercicio_id;
    }
    if (!empty($request->tipo_actividad_id)){
        $requestData['tipo_actividad_id'] = $request->tipo_actividad_id;
    }
    if (!empty($request->sesion_id)){
        $requestData['sesion_id'] = $request->sesion_id;
    }

    // Update the record
    $data = tap(DB::table('lineas_sesion')->where('id', $lineassesion->id))
    ->update($requestData)
    ->first();

    return response()->json([
        'data' => $data,
    ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(LineaSesion $lineassesion)
    {
        LineaSesion::where('id', $lineassesion->id)->delete();

        return $this->displayMessage('The user was successfully deleted!', 200, 'Status');
    }

    public function getMaxLineaId()
    {
        try {
            $result = DB::select('SELECT MAX(id) AS maxId FROM lineas_sesion');
            $maxId = $result[0]->maxId;
            return response()->json(['maxId' => $maxId]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}
