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
        Schema::create('entrenadores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('avatar')->nullable();
            $table->string('iban', 24)->nullable();
            $table->string('informacion', 400)->nullable();
            $table->timestamps();
        });

        Schema::table('atletas', function (Blueprint $table) {
            $table->foreignId('entrenador_id')->nullable()->constrained('entrenadores')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('atletas', function (Blueprint $table) {
            $table->dropForeign(['entrenador_id']);
            $table->dropColumn('entrenador_id');
        });


        Schema::dropIfExists('entrenadores');
    }
};
