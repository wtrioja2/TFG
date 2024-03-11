<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sesion extends Model
{
    use HasFactory;

    protected $table = 'sesiones';

    protected $fillable = [
        'fecha',
        'nombre',
        'descripcion',
        'atleta_id',
        'microciclo_id'
    ];

    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }

    public function microciclo()
    {
        return $this->belongsTo(Microciclo::class, 'microciclo_id');
    }

    public function lineasSesion()
    {
        return $this->hasMany(LineaSesion::class);
    }

}
