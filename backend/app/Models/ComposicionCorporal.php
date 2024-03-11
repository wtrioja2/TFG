<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComposicionCorporal extends Model
{
    use HasFactory;

    protected $table = 'composicion_corporal'; 

    protected $fillable = [
        'fecha',
        'altura',
        'peso',
        'atleta_id',
    ];

    public function atleta()
    {
        return $this->belongsTo(Atleta::class, 'atleta_id');
    }

}
