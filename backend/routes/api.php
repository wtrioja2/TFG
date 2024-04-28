<?php


use App\Http\Controllers\Api\AtletaController;
use App\Http\Controllers\Api\EntrenadorController;
use App\Http\Controllers\Api\ComposicionCorporalController;
use App\Http\Controllers\Api\EjercicioController;
use App\Http\Controllers\Api\LineaSesionController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\MacrocicloController;
use App\Http\Controllers\Api\MesocicloController;
use App\Http\Controllers\Api\MicrocicloController;
use App\Http\Controllers\Api\RMController;
use App\Http\Controllers\Api\SesionController;
use App\Http\Controllers\Api\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('v1/register', [UserController::class, 'store']);

Route::post('v1/login', [LoginController::class, 'index']);
Route::middleware('auth:sanctum')->get('v1/check-token', [LoginController::class, 'checkToken']);

Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::post('v1/logout', [LogoutController::class, 'index']);
});

Route::get('v1/lineassesion/maxid', [LineaSesionController::class, 'getMaxLineaId']);
Route::get('v1/sesiones/total', [SesionController::class, 'getTotalsByFecha']);
Route::get('v1/sesiones/sesiones-con-lineas', [SesionController::class, 'getSesionesConLineas']);
Route::get('v1/atletas/{atletaId}/sesiones', [SesionController::class, 'getSesionesPorAtletaId']);
Route::post('v1/sesiones/copiar-lineas', [SesionController::class, 'copiarLineasANuevaSesion']);
Route::get('v1/ejercicios/select', [EjercicioController::class, 'indexForSelect']);
Route::get('v1/ejercicios/todos', [EjercicioController::class, 'indexTotalEjercicios']);
Route::get('v1/entrenadores/todos', [EntrenadorController::class, 'indexTotalEntrenadores']);
Route::get('v1/ejercicios/filtrar', [EjercicioController::class, 'filtrar']);
Route::get('v1/ejercicios/nombre', [EjercicioController::class, 'filtrarPorNombre']);
Route::get('v1/rm/indexById', [RMController::class, 'indexById']);
Route::get('v1/sesiones/indexById', [SesionController::class, 'indexById']);
Route::get('v1/microciclos/indexById', [MicrocicloController::class, 'indexById']);
Route::get('v1/mesociclos/indexById', [MesocicloController::class, 'indexById']);
Route::get('v1/macrociclos/indexById', [MacrocicloController::class, 'indexById']);
Route::get('v1/lineassesion/indexById', [LineaSesionController::class, 'indexById']);
Route::get('v1/atletas/indexByUserId', [AtletaController::class, 'indexByUserId']);
Route::get('v1/entrenadores/{entrenador}/atletas', [EntrenadorController::class, 'getAtletas']);



Route::apiResource('v1/users', UserController::class);
Route::apiResource('v1/atletas', AtletaController::class);
Route::apiResource('v1/ejercicios', EjercicioController::class);
Route::apiResource('v1/rm', RMController::class);
Route::apiResource('v1/sesiones', SesionController::class);
Route::apiResource('v1/lineassesion', LineaSesionController::class);
Route::apiResource('v1/composicioncorporal', ComposicionCorporalController::class);
Route::apiResource('v1/entrenadores', EntrenadorController::class);
Route::apiResource('v1/microciclos', MicrocicloController::class);
Route::apiResource('v1/mesociclos', MesocicloController::class);
Route::apiResource('v1/macrociclos', MacrocicloController::class);
