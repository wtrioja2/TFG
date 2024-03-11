<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SesionCollection;
use App\Models\Ejercicio;
use App\Models\Sesion;
use App\Models\LineaSesion;
use Illuminate\Http\Request;

class SesionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new SesionCollection(Sesion::paginate(15));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($idOrFecha)
    {
        $sesione = Sesion::find($idOrFecha);
        if (!$sesione) {
            $sesione = Sesion::where('fecha', $idOrFecha)->first();

        }
        if ($sesione) {
            return response()->json($sesione, 200);
        } else {
            return response()->json(['message' => 'Sesión no encontrada'], 404);
        }
    }


    public function getSesionesPorAtletaId($atletaId)
{
    try {
        // Busca las sesiones del atleta por su ID
        $sesiones = Sesion::where('atleta_id', $atletaId)->get();

        // Verifica si se encontraron sesiones para el atleta
        if ($sesiones->isEmpty()) {
            return response()->json(['message' => 'No se encontraron sesiones para el atleta'], 404);
        }

        // Retorna las sesiones encontradas en formato JSON
        return response()->json([
            'sesiones' => $sesiones,
        ]);
    } catch (\Exception $e) {
        // Manejo de errores
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sesion $sesione)
    {
        Sesion::where('id', $sesione->id)->delete();

        return $this->displayMessage('La sesión se ha borrado!', 200, 'Status');
    }

    public function getSesionesConLineas()
{
    $sesionesConLineas = Sesion::with('lineasSesion')->get();

    return response()->json([
        'data' => $sesionesConLineas,
    ]);
}
    public function getTotalsByFecha(Request $request)
    {
        try {
            $fecha = $request->input('fecha');
            $sesiones = Sesion::where('fecha', $fecha)->with(['lineasSesion' => function ($query) use ($fecha) {
                $query->where('fecha', $fecha);
            }])->get();

            //Iniciamos totales
            $totalEjercicios = 0;
            $totalRepeticiones = 0;
            $volumenAbsolutoTotal = 0;
            $volumenRelativoTotal = 0;

            foreach ($sesiones as $sesion) {

                 //Calculamos el total de ejercicios distintos
                $ejerciciosIds = $sesion->lineasSesion->pluck('ejercicio_id')->unique()->toArray();
                $totalEjercicios += count($ejerciciosIds);

                //Calculamos el total de repeticiones (series * repeticiones)
                $totalRepeticiones += $sesion->lineasSesion->sum(function ($lineaSesion){
                    return $lineaSesion->series * $lineaSesion->repeticiones;
                });

                //Calculamos el volumen absoluto (series * repeticiones * kilos)
                $volumenAbsolutoSesion = $sesion->lineasSesion->sum(function ($lineaSesion) {
                    return $lineaSesion->series * $lineaSesion->repeticiones * $lineaSesion->kilos;
                });
                $volumenAbsolutoTotal += $volumenAbsolutoSesion;

                //Calculamos el volumen relativo (%1RM * repeticiones) - (%1RM = kilos / 1RM)
                $volumenRelativoSesion = $sesion->lineasSesion->sum(function ($lineaSesion) use ($sesion){
                    $ejercicio = Ejercicio::find($lineaSesion->ejercicio_id);

                    $ultimaFechaRM = $ejercicio->rms->where('fecha', '<=', $sesion->fecha)->max('fecha');
                    $ultimaRM = $ejercicio->rms->where('fecha', $ultimaFechaRM)->first();

                    if ($ultimaRM){
                        $rm = $ultimaRM->rm;
                        $volumen = ($lineaSesion->kilos / $rm) * ($lineaSesion->series * $lineaSesion->repeticiones);
                        $volumenRedondeado = number_format($volumen, 2);
                        return $volumenRedondeado;
                    } else {
                        return 0;
                    }
                });
                $volumenRelativoTotal += $volumenRelativoSesion;
            }

            return response()->json([
                'total_ejercicios'  => $totalEjercicios,
                'total_repeticiones' => $totalRepeticiones,
                'volumen_absoluto' => $volumenAbsolutoTotal,
                'volumen_relativo' => $volumenRelativoTotal,
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function copiarLineasANuevaSesion (Request $request)
    {
        try {
            $sesionOriginalId = $request->input('sesion_original_id');
            $nuevaSesionFecha = $request->input('nueva_sesion_fecha');

            $sesionOriginal = Sesion::find($sesionOriginalId);

            if(!$sesionOriginal){
                return response()->json(['message' => 'Sesión original no encontrada'], 404);
            }
            $nuevaSesion = new Sesion();
            $nuevaSesion->fecha = $nuevaSesionFecha;
            $nuevaSesion->nombre = $sesionOriginal->nombre;
            $nuevaSesion->atleta_id = $sesionOriginal->atleta_id;
            $nuevaSesion->microciclo_id = $sesionOriginal->microciclo_id;



            $nuevaSesion->save();

            foreach($sesionOriginal->lineasSesion as $lineaSesion){

                $nuevaLineaSesion = new LineaSesion();
                $nuevaLineaSesion->sesion_id = $nuevaSesion->id;
                $nuevaLineaSesion->fecha = $nuevaSesionFecha;
                $nuevaLineaSesion->atleta_id = $lineaSesion->atleta_id;
                $nuevaLineaSesion->ejercicio_id = $lineaSesion->ejercicio_id;
                $nuevaLineaSesion->tipo_actividad_id = $lineaSesion->tipo_actividad_id;
                $nuevaLineaSesion->series = $lineaSesion->series;
                $nuevaLineaSesion->repeticiones = $lineaSesion->repeticiones;
                $nuevaLineaSesion->kilos = $lineaSesion->kilos;
                $nuevaLineaSesion->tiempo_esfuerzo = $lineaSesion->tiempo_esfuerzo ?? null;
                $nuevaLineaSesion->tiempo_descanso = $lineaSesion->tiempo_descanso ?? null;
                $nuevaLineaSesion->comentario = $lineaSesion->comentario ?? null;

                $nuevaLineaSesion->save();
            }
            return response()->json(['message' => 'Líneas de sesión copiadas a la nueva sesión'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
