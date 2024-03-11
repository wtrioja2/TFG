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
        Schema::create('microciclos', function (Blueprint $table) {
            $table->id();
            $table->integer('semana');
            $table->string('nombre');
            $table->string('descripción', 400)->nullable();

            // Agregar campo para la clave foránea atleta_id
            $table->unsignedBigInteger('atleta_id');

            // Definir la relación de clave foránea con la tabla actividad_id
            $table->foreign('atleta_id')
                ->references('id')
                ->on('atletas')
                ->onDelete('cascade'); // Opcional: define la acción en cascada si se elimina la actividad

            // Clave foránea mesociclo_id
            $table->unsignedBigInteger('mesociclo_id');
            $table->foreign('mesociclo_id')
                ->references('id')
                ->on('mesociclos')
                ->onDelete('cascade');

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
        Schema::dropIfExists('microciclos');
    }
};
