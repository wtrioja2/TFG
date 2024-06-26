<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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

    protected static function booted()
    {
        static::creating(function ($sesion) {
            if (empty ($sesion->fecha)) {
                $sesion->fecha = Carbon::now()->toDateString();
            }
        });
    }

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
