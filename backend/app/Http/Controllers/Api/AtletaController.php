<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AtletaCollection;
use App\Models\Atleta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;

class AtletaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AtletaCollection
     */
    public function index()
    {
        return new AtletaCollection(Atleta::paginate(12));
    }

    /**
     * Display the specified resource by user ID.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function indexByUserId(Request $request)
    {
        // Obtener el user_id del atleta del parámetro de la solicitud
        $userId = $request->input('user_id');

        // Buscar el atleta por su user_id
        $atleta = Atleta::where('user_id', $userId)->first();

        if (!$atleta) {
            return response()->json(['message' => 'Atleta no encontrado'], 404);
        }

        // Ahora que hemos encontrado al atleta, puedes realizar cualquier lógica adicional aquí

        return response()->json(['data' => $atleta], 200);
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
            'informacion' => ['nullable', 'string', 'max:400'],
            'entrenador_id' => ['nullable'],
            'movil' => ['nullable', 'string', 'max:9'],
        ]);

        // Manejar errores de validación
        if ($validator->fails()) {
            return response()->json([
                'message' => 'There are some fields that are required or invalid!',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Guardar la imagen del avatar en el sistema de archivos
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');

            // Comprimir la imagen si es mayor de 2MB
            if ($avatar->getSize() > 2000000) {
                $compressedImage = Image::make($avatar)->encode('jpg', 75);
                $avatarName = uniqid() . '.jpg';
                Storage::put('avatars/' . $avatarName, $compressedImage->stream());
            } else {
                $avatarName = uniqid() . '.' . $avatar->getClientOriginalExtension();
                $avatar->storeAs('avatars', $avatarName);
            }
        }

        // Crear el atleta
        $atleta = Atleta::create([
            'apodo' => $request->apodo,
            'user_id' => $request->user_id,
            'entrenador_id' => $request->entrenador_id ?? null,
            'avatar' => $avatarName ?? null, // Guardar el nombre del archivo si se subió una imagen
            'informacion' => $request->informacion ?? null,
            'movil' => $request->movil ?? null,
        ]);

        // Respuesta exitosa
        return response()->json([
            'data' => $atleta,
            'message' => 'Atleta guardado!',
        ], 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Atleta $atleta)
    {
        return response()->json($atleta, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Atleta $atleta)
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

        // Prepara los datos para actualizar
        $updateData = [
            'apodo' => $request->apodo,
            'user_id' => $request->user_id,
            'informacion' => $request->informacion,
        ];

        // Actualiza el avatar si se proporciona uno nuevo
        if ($request->hasFile('avatar')) {
            // Elimina el avatar anterior si existe
            if ($atleta->avatar) {
                Storage::delete('avatars/' . $atleta->avatar);
            }

            // Guarda el nuevo avatar
            $avatar = $request->file('avatar');
            $avatarName = uniqid() . '.' . $avatar->getClientOriginalExtension();
            $avatar->storeAs('avatars', $avatarName);

            // Agrega el avatar al arreglo de datos para actualizar
            $updateData['avatar'] = $avatarName;
        }

        // Actualiza los campos del atleta con los datos proporcionados en la solicitud
        $atleta->update($updateData);

        // Devuelve una respuesta indicando que la actualización se realizó correctamente
        return response()->json([
            'message' => 'Atleta actualizado!',
            'data' => $atleta,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Atleta $atleta)
    {
        // Delete the exercise
        Atleta::where('id', $atleta->id)->delete();

        return $this->displayMessage('Atleta borrado!', 200, 'Status');
    }
}
