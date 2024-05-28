<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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

    protected static function booted()
    {
        static::creating(function ($microciclo) {
            if (empty($microciclo->semana)) {
                $microciclo->semana = Carbon::now()->weekOfYear;
            }
        });
    }

    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }

    public function mesociclo()
    {
        return $this->belongsTo(Mesociclo::class, 'mesociclo_id');
    }
}
