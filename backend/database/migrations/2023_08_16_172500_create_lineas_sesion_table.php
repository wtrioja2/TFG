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
        Schema::create('lineas_sesion', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->integer('series');
            $table->integer('repeticiones');
            $table->decimal('kilos', 10, 2);
            $table->integer('tiempo_esfuerzo')->nullable();
            $table->integer('tiempo_descanso')->nullable();
            $table->decimal('velocidad', 10, 2)->nullable();
            $table->string('comentario', 255)->nullable();

            // Clave foránea atleta_id
            $table->unsignedBigInteger('atleta_id');
            $table->foreign('atleta_id')
                ->references('id')
                ->on('atletas')
                ->onDelete('cascade');

            // Clave foránea ejercicio_id
            $table->unsignedBigInteger('ejercicio_id');
            $table->foreign('ejercicio_id')
                ->references('id')
                ->on('ejercicios')
                ->onDelete('cascade');

	    // Clave foránea sesion_id
            $table->unsignedBigInteger('sesion_id');
            $table->foreign('sesion_id')
                ->references('id')
                ->on('sesiones')
                ->onDelete('restrict');

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
        Schema::dropIfExists('lineas_sesion');
    }
};
