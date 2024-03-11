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
        Schema::create('composicion_corporal', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->integer('altura');
            $table->decimal('peso', 10, 1);
        
            // Clave foránea atleta_id
            $table->unsignedBigInteger('atleta_id');
            $table->foreign('atleta_id')
                ->references('id')
                ->on('atletas')
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
        Schema::dropIfExists('composicion_corporal');
    }
};
