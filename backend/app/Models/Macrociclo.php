<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Macrociclo extends Model
{
    use HasFactory;

    protected $table = 'macrociclos';

    protected $fillable = [
        'año',
        'nombre',
        'descripcion',
        'atleta_id',
    ];

    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }

}
