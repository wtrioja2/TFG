<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mesociclo extends Model
{
    use HasFactory;
    protected $table = 'mesociclos';

    protected $fillable = [
        'mes',
        'nombre',
        'descripcion',
        'atleta_id',
        'macrociclo_id'
    ];

    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }

    public function macrociclo()
    {
        return $this->belongsTo(Macrociclo::class, 'macrociclo_id');
    }
}
