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
        Schema::create('rm', function (Blueprint $table) {
            $table->id();
            $table->date('fecha')->nullable(false);
            $table->decimal('rm', 10, 2)->nullable(false);
            
            // Agregar campo para la clave foránea actividad_id
            $table->unsignedBigInteger('ejercicio_id');

            // Definir la relación de clave foránea con la tabla actividad_id
            $table->foreign('ejercicio_id')
                ->references('id')
                ->on('ejercicios')
                ->onDelete('cascade'); // Opcional: define la acción en cascada si se elimina la actividad
        
                // Agregar campo para la clave foránea atleta_id
                $table->unsignedBigInteger('atleta_id');
    
                // Definir la relación de clave foránea con la tabla actividad_id
                $table->foreign('atleta_id')
                    ->references('id')
                    ->on('atletas')
                    ->onDelete('cascade'); // Opcional: define la acción en cascada si se elimina la actividad
                
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
        Schema::dropIfExists('rm');
    }
};
