<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LineaSesion extends Model
{
    use HasFactory;

    protected $table = 'lineas_sesion'; 

    public $timestamps = false;

    protected $fillable = [
        'fecha',
        'series',
        'repeticiones',
        'kilos',
        'tiempo_esfuerzo',
        'tiempo_descanso',
        'comentario',
        'atleta_id',
        'ejercicio_id',
        'tipo_actividad_id',
        'sesion_id',
    ];

    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }

    public function ejercicio()
    {
        return $this->belongsTo(Ejercicio::class, 'ejercicio_id');
    }

    public function tipoActividad()
    {
        return $this->belongsTo(TipoActividad::class, 'tipo_actividad_id');
    }

    public function sesion()
    {
        return $this->belongsTo(Sesion::class, 'sesion_id');
    }
}
