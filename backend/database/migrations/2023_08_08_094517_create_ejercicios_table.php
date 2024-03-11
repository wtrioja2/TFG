<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ejercicios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique()->nullable(false);
            $table->string('url_foto')->nullable();
            $table->string('url_video')->nullable();
            $table->string('descripcion', 400)->nullable();
            $table->enum('tipo', ['fuerza', 'cardio', 'movilidad', 'otro'])->default('fuerza');
            $table->enum('grupo_muscular', ['pecho', 'espalda', 'pierna', 'hombro', 'biceps', 'triceps', 'core', 'otro'])->default('otro');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ejercicios');
    }
};
