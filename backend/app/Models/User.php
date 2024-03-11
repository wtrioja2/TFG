<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
	    'last_name',
        'email',
        'password',
        'rol'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Verifica si el usuario es un atleta.
     *
     * @return bool
     */
    public function isAtleta()
    {
        return in_array('atleta', $this->rol);
    }

    /**
     * Verifica si el usuario es un entrenador.
     *
     * @return bool
     */
    public function isEntrenador()
    {

        return in_array('entrenador', $this->rol);
    }

     /**
     * Verifica si el usuario es un admin.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return in_array('admin', $this->rol);
    }

}
