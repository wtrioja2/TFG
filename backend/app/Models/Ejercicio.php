<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ejercicio extends Model
{
    use HasFactory;

    protected $table = 'ejercicios';

    protected $fillable = [
        'nombre',
        'url_foto',
        'url_video',
        'descripcion',
        'tipo',
        'grupo_muscular'
    ];

    public function rms()
    {
        return $this->hasMany(RM::class)->latest();
    }
}
