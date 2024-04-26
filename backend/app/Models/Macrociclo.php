<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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

    protected static function booted()
    {
        static::creating(function ($macrociclo) {
            $macrociclo->año = Carbon::now()->year;
        });
    }

    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }

}
