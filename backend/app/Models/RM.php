<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RM extends Model
{
    use HasFactory;

    protected $table = 'rm';
    protected $dates = ['fecha'];
    
    protected $fillable = [
        'rm',
        'fecha', 
        'ejercicio_id',
        'atleta_id',
    ];

    public function ejercicio()
    {
        return $this->belongsTo(Ejercicio::class, 'ejercicio_id');
    }

    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }
}
