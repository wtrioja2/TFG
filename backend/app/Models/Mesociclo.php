<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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

    protected static function booted()
    {
        static::creating(function ($mesociclo) {
            $mesociclo->mes = Carbon::now()->month;
        });
    }
    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }

    public function macrociclo()
    {
        return $this->belongsTo(Macrociclo::class, 'macrociclo_id');
    }
}
