<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class EjercicioNombreCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($ejercicio) {
                return [
                    'id' => $ejercicio->id,
                    'nombre' => $ejercicio->nombre,
                ];
            }),
        ];
    }
}
