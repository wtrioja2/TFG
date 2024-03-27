<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EjercicioCollection;
use App\Http\Resources\EjercicioNombreCollection;
use App\Models\Ejercicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class EjercicioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return EjercicioCollection
     */
    public function index()
    {
        return new EjercicioCollection(Ejercicio::paginate(12));
    }

    public function indexForSelect()
    {
        return new EjercicioNombreCollection(Ejercicio::paginate(25));
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
            'nombre' => ['required', Rule::unique('ejercicios', 'nombre')],
            'url_foto' => 'nullable',
            'url_video' => 'nullable',
        ]);

        // Block or catch any validation failure if there are any
        if ($validator->fails()){
            return response()->json([
                'message' => 'There are some fields that are required!',
                'errors' => $validator->errors(),
            ]);
        }

        // Create ejercicio
        $ejercicio = Ejercicio::create($request->all());

        return response()->json([
            'data' => $ejercicio,
            'message' => 'Ejercicio guardado!'
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ejercicio  $ejercicio
     * @return \Illuminate\Http\Response
     */
    public function show(Ejercicio $ejercicio)
    {
        return response()->json($ejercicio, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ejercicio  $ejercicio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ejercicio $ejercicio)
{
    // Validar los datos recibidos
    $validator = Validator::make($request->all(), [
        'nombre' => [
            'required',
            Rule::unique('ejercicios', 'nombre')->ignore($ejercicio->id),
        ],
        'url_foto' => 'nullable|url',
        'url_video' => 'nullable|url',
        'tipo' => 'in:fuerza,cardio,movilidad,otro',
        'grupo_muscular' => 'in:pecho,espalda,pierna,hombro,biceps,triceps,core,otro',
    ]);

    // Manejar cualquier error de validación
    if ($validator->fails()) {
        return response()->json([
            'message' => 'Error de validación',
            'errors' => $validator->errors(),
        ], 422);
    }

    // Actualizar el ejercicio con los datos recibidos
    $ejercicio->update($request->only([
        'nombre',
        'url_foto',
        'url_video',
        'descripcion',
        'tipo',
        'grupo_muscular',
    ]));

    return response()->json([
        'message' => 'Ejercicio actualizado correctamente',
        'data' => $ejercicio,
    ], 200);
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ejercicio  $ejercicio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ejercicio $ejercicio)
    {
        // Delete the exercise
        $ejercicio->delete();

        return $this->displayMessage('Ejercicio borrado!', 200, 'Status');
    }

    public function filtrar(Request $request)
    {

        $query = Ejercicio::query();
        if ($request->has('tipo')) {
            $tipo = $request->input('tipo');
            if ($tipo !== '-1') {
                $query->where('tipo', $tipo);
            }
            // Si tipo es -1, no se aplica filtro por tipo de ejercicio
        }
        if ($request->has('grupo_muscular')) {
            $grupoMuscular = $request->input('grupo_muscular');
            if ($grupoMuscular !== '-1') {
                $query->where('grupo_muscular', $grupoMuscular);
            }
            // Si grupo_muscular es -1, no se aplica filtro por grupo muscular
        }

        $ejercicios = $query->paginate(12);

        return response()->json($ejercicios);
    }

    public function filtrarPorNombre(Request $request)
    {

        $query = Ejercicio::query();

        if ($request->has('nombre')) {
            $nombre = $request->input('nombre');
            $query->where('nombre', 'like', '%' . $nombre . '%');
        }

        $ejercicios = $query->paginate(12);

        return response()->json($ejercicios);
    }
}
