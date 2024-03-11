<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrenador extends Model
{
    use HasFactory;

    protected $table = 'entrenadores';

    protected $fillable = [
        'user_id',
        'iban',
        'informacion',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function atletas()
    {
        return $this->hasMany(Atleta::class);
    }
}
