<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Microciclo extends Model
{
    use HasFactory;

    protected $table = 'microciclos';

    protected $fillable = [
        'semana',
        'nombre',
        'descripcion',
        'atleta_id',
        'mesociclo_id'
    ];

    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }

    public function mesociclo()
    {
        return $this->belongsTo(Mesociclo::class, 'microciclo_id');
    }
}
