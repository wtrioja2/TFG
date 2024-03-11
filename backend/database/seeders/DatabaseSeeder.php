<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Crear 3 usuarios: admin, entrenador y deportista
        DB::table('users')->insert([
            'first_name'=>'Eduardo',
            'last_name'=>'Jimeno Pablo',
            'email'=>'wtrioja@hotmail.com',
            'password'=> Hash::make('betagwe44'),
            'rol'=>'entrenador',
        ]);

        DB::table('users')->insert([
            'first_name'=>'Admin',
            'last_name'=>'Jimeno Pablo',
            'email'=>'info@hangar-gym.com',
            'password'=> Hash::make('betagwe44'),
            'rol'=>'admin'
        ]);

        DB::table('users')->insert([
            'first_name'=>'Alexandra',
            'last_name'=>'Pascual Bastida',
            'email'=>'distribucionesmarpe@gmail.com',
            'password'=> Hash::make('123456'),
        ]);

        // Creo entrenador
        DB::table('entrenadores')->insert([
            'user_id'=>2,
            'iban'=>'ES2212345678912345678901',
            'informacion'=>'La élite',
        ]);

        // Crear atleta
        DB::table('atletas')->insert([
            'user_id'=>3,
            'apodo'=>'Rilu',
            'avatar'=>'prueba',
            'informacion'=>'La élite',
            'movil'=>'676685508',
            'entrenador_id'=>1
        ]);

        // Crear ejercicios
        DB::table('ejercicios')->insert([
            'nombre'=>'Press banca',
            'url_foto' => 'https://i.imgur.com/s9ZLZRU.jpg',
            'url_video'=>'https://www.youtube.com/embed/0viRpQwovQs?si=9ogQltvLKTOWot-l',
            'descripcion'=>'Ejercicio básico para pecho',
            'tipo'=>'fuerza',
            'grupo_muscular'=>'pecho'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Curl barra Z',
            'url_foto' => 'https://i.imgur.com/tHnVXju.jpg',
            'url_video'=>'https://www.youtube.com/embed/oUpFUVG9mIM?si=zvXn5Ik0aH0nBSg5',
            'grupo_muscular'=>'biceps'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Press mancuerna incliando',
            'url_foto' => 'https://i.imgur.com/mbBVZZr.jpg',
            'url_video'=>'https://www.youtube.com/embed/igqmE9o32iM?si=44wgIRIY_B5DEM_r',
            'grupo_muscular'=>'pecho'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Jalón trasnuca poleas dobles',
            'url_foto'  => 'https://i.imgur.com/nkORQHm.jpg',
            'url_video'=>'https://www.youtube.com/embed/21aSP4A4pQY?si=XG3qDSgMWQB5JrQ4',
            'grupo_muscular'=>'espalda'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Tríceps polea',
            'url_foto'  => 'https://i.imgur.com/XkvnqAv.jpg',
            'url_video'=>'https://www.youtube.com/embed/u5Bo2TTxaNY?si=A-q3OFp3ES_vHCLp',
            'grupo_muscular'=>'triceps'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Remo bajo ancho neutro',
            'url_foto'  => 'https://i.imgur.com/yyPasui.jpg',
            'url_video'=>'https://www.youtube.com/embed/M-AYiD4kcqc?si=_rbfu_56zeHFJx0y',
            'grupo_muscular'=>'espalda'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Sentadilla',
            'url_foto'  => 'https://i.imgur.com/KAraiZE.jpg',
            'url_video'=>'https://www.youtube.com/embed/TCjz6hxTnRI?si=5hK5t2eLeCOcvutP',
            'grupo_muscular'=>'pierna'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Trapecio barra + extensión',
            'url_foto'  => 'https://i.imgur.com/dNmMof1.jpg',
            'url_video'=>'https://www.youtube.com/embed/wxtWXeoFb3g?si=GJeViam6jJJ-LfX3',
            'grupo_muscular'=>'hombro'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Extensión cuádriceps',
            'url_foto'  => 'https://i.imgur.com/I0DBa5F.jpg',
            'url_video'=>'https://www.youtube.com/embed/yVZ3svGnxgU?si=Zihpop7upIyb9xAL',
            'grupo_muscular'=>'pierna'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Dominadas',
            'url_foto' => 'https://i.imgur.com/kO110Qq.jpg',
            'url_video'=>'https://www.youtube.com/embed/GjbDr3XDuZs?si=Iopxysv9ZEaQgE3i',
            'grupo_muscular'=>'espalda'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Fodos tríceps paralelas',
            'url_foto' => 'https://i.imgur.com/dwsOGXJ.jpg',
            'url_video'=>'https://www.youtube.com/embed/6gHNdH0uZLg?si=MPZx5jtEKAlfSLvp',
            'grupo_muscular'=>'triceps'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Remo bajo alterno',
            'url_foto' => 'https://i.imgur.com/KKDmWOd.jpg',
            'url_video'=>'https://www.youtube.com/embed/qDSQRi2opgw?si=8Xl-FMY5Y2iiEEHN',
            'grupo_muscular'=>'espalda'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Tijera caminando',
            'url_foto' => 'https://i.imgur.com/pXSOdSR.jpg',
            'url_video'=>'https://www.youtube.com/embed/-FyrSX9ELFA?si=wsNANF6VRrrjygWc',
            'grupo_muscular'=>'pierna'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Elevación lateral 180º',
            'url_foto' => 'https://i.imgur.com/bF4xHjh.jpg',
            'url_video'=>'https://www.youtube.com/embed/tAwxCKWUjVY?si=2N--CV1x4yID8MHA',
            'grupo_muscular'=>'hombro'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Prensa Max Rack',
            'url_foto' => 'https://i.imgur.com/7UYdu4S.jpg',
            'url_video'=>'https://www.youtube.com/embed/1Y2cgPBOGVc?si=dEl1PYcRDtJQLZOp',
            'grupo_muscular'=>'pierna'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Press inclinado polea dual',
            'url_foto' => 'https://i.imgur.com/vQElQSi.jpg',
            'url_video'=>'https://www.youtube.com/embed/5HWI0RWHzgc?si=HCdk50zIuGi0qW0V',
            'grupo_muscular'=>'pecho'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Curl martillo',
            'url_foto' => 'https://i.imgur.com/F4AQmw0.jpg',
            'url_video'=>'https://www.youtube.com/embed/0VFmygO7zlY?si=o1Raos2O0scShADW',
            'grupo_muscular'=>'biceps'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Pullover mancuerna',
            'url_foto' => 'https://i.imgur.com/xOxMfuX.jpg',
            'url_video'=>'https://www.youtube.com/embed/zvvO5GECTkA?si=Kzc-P0_nIwtVS9G1',
            'grupo_muscular'=>'pecho'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Peso muerto hexagonal',
            'url_foto' => 'https://i.imgur.com/vulTJlZ.jpg',
            'url_video'=>'https://www.youtube.com/embed/4CQmmM2QPRI?si=qHoWK5CrYCV56-CT',
            'grupo_muscular'=>'pierna'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Press militar mancuerna',
            'url_foto' => 'https://i.imgur.com/ShNIUrw.jpg',
            'url_video'=>'https://www.youtube.com/embed/KzhJhQRaVx0?si=su7-rlYXrOiRVWJy',
            'grupo_muscular'=>'hombro'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Pistol squat asistido',
            'url_foto' => 'https://i.imgur.com/lZWk6MF.jpg',
            'url_video'=>'https://www.youtube.com/embed/UwdGJUelz3A?si=e1TqPhPmR9IkUCTS',
            'grupo_muscular'=>'pierna',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Cruce polea 2 manos',
            'url_foto' => 'https://i.imgur.com/spEiepL.jpg',
            'url_video'=>'https://www.youtube.com/embed/DNl_yEgLZQc?si=7JlJ2-jCL26phGUo',
            'grupo_muscular'=>'pecho',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Curl barra recta Max Rack',
            'url_foto' => 'https://i.imgur.com/88Lg9U3.jpg',
            'url_video'=>'https://www.youtube.com/embed/sdIu9JIG6BI?si=6CNsiY0opk6k-g2F',
            'grupo_muscular'=>'biceps',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Press mancuerna plano',
            'url_foto' => 'https://i.imgur.com/nqbX37g.jpg',
            'url_video'=>'https://www.youtube.com/embed/mI_WIA9GV9o?si=XQrCdAYKj1gpHsgV',
            'grupo_muscular'=>'pecho'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Jalón al pecho',
            'url_foto' => 'https://i.imgur.com/1tQ78OR.jpg',
            'url_video'=>'https://www.youtube.com/embed/PUDxb7iioW8?si=P3DuqvwhGbLqHXWD',
            'grupo_muscular'=>'espalda'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Patada tríceps polea',
            'url_foto' => 'https://i.imgur.com/PHthfj0.jpg',
            'url_video'=>'https://www.youtube.com/embed/SdeeylYWDg4?si=qb97rzYnuW1BFO26',
            'grupo_muscular'=>'triceps'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Remo agarre prono',
            'url_foto' => 'https://i.imgur.com/lC8h5Tj.jpg',
            'url_video'=>'https://www.youtube.com/embed/KZhLrPTwXZY?si=1sWF3Pc8ucrJiF0p',
            'grupo_muscular'=>'espalda'
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Cinta',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'cardio',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Elíptica',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'cardio',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Bici spinning',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'cardio',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Bici aire',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'cardio',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Remo',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'cardio',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Ski',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'cardio',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Step',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'cardio',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Box Jump',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'cardio',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Gato - Vaca',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'movilidad',
        ]);
        DB::table('ejercicios')->insert([
            'nombre'=>'Mortal con tirabuzón',
            'url_foto' => '',
            'url_video'=>'',
            'tipo'=>'otro',
        ]);




        // Crear RM
        DB::table('rm')->insert([
            'rm'=>120,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>1,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>55,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>2,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>90,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>3,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>95,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>4,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>42.5,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>5,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>87.5,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>6,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>140,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>7,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>40,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>8,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>65,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>9,
            'atleta_id'=>1,
        ]);
        //RM duplicada para press banca para testear funcionalidad
        DB::table('rm')->insert([
            'rm'=>125,
            'fecha'=>'2023-08-10',
            'ejercicio_id'=>1,
            'atleta_id'=>1,
        ]);

        DB::table('rm')->insert([
            'rm'=>120,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>10,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>130,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>11,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>110,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>12,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>130,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>13,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>30,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>14,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>200,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>15,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>60,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>16,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>40,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>17,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>32.5,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>18,
            'atleta_id'=>1,
        ]);

        DB::table('rm')->insert([
            'rm'=>190,
            'fecha'=>'2023-08-10',
            'ejercicio_id'=>19,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>55,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>20,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>70,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>21,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>55,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>22,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>40,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>23,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>90,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>24,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>115,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>25,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>25,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>26,
            'atleta_id'=>1,
        ]);
        DB::table('rm')->insert([
            'rm'=>90,
            'fecha'=>'2023-08-09',
            'ejercicio_id'=>27,
            'atleta_id'=>1,
        ]);


        // Crear macrociclo
        DB::table('macrociclos')->insert([
            'año'=>2023,
            'nombre'=>'Primer macrociclo',
            'atleta_id'=>1,
        ]);

        // Crear mesociclo
        DB::table('mesociclos')->insert([
            'mes'=> 10,
            'nombre'=>'Primer mesociclo ondulante',
            'atleta_id'=> 1,
            'macrociclo_id'=> 1,
        ]);

         // Crear Microciclos (semanas)
        DB::table('microciclos')->insert([
            'semana'=> 40,
            'nombre'=>'1º Ondulante (1/4)',
            'atleta_id'=> 1,
            'mesociclo_id'=> 1,
        ]);
        DB::table('microciclos')->insert([
            'semana'=> 41,
            'nombre'=>'1º Ondulante (2/4)',
            'atleta_id'=>1,
            'mesociclo_id'=>1,
        ]);
        DB::table('microciclos')->insert([
            'semana'=> 42,
            'nombre'=>'1º Ondulante (3/4)',
            'atleta_id'=>1,
            'mesociclo_id'=>1,
        ]);
        DB::table('microciclos')->insert([
            'semana'=> 43,
            'nombre'=>'1º Ondulante (4/4)',
            'atleta_id'=>1,
            'mesociclo_id'=>1,
        ]);

         // Crear Sesiones (días)
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-02',
            'nombre'=>'1º Ondulante (1/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-04',
            'nombre'=>'1º Ondulante (2/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-06',
            'nombre'=>'1º Ondulante (3/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);

        //Las comento para crearlas con copia-pega
        /* DB::table('sesiones')->insert([
            'fecha'=>'2023-10-09',
            'nombre'=>'1º Ondulante (4/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-11',
            'nombre'=>'1º Ondulante (5/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-13',
            'nombre'=>'1º Ondulante (6/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-16',
            'nombre'=>'1º Ondulante (7/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-18',
            'nombre'=>'1º Ondulante (8/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-20',
            'nombre'=>'1º Ondulante (9/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-23',
            'nombre'=>'1º Ondulante (10/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-25',
            'nombre'=>'1º Ondulante (11/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]);
        DB::table('sesiones')->insert([
            'fecha'=>'2023-10-27',
            'nombre'=>'1º Ondulante (12/12)',
            'atleta_id'=>1,
            'microciclo_id'=>1,
        ]); */

        // Crear Lineas de sesión
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-02',
            'series'=>3,
            'repeticiones'=>5,
            'kilos'=>95,
            'atleta_id'=>1,
            'ejercicio_id'=>1,
            'sesion_id'=>1,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-02',
            'series'=>3,
            'repeticiones'=>5,
            'kilos'=>35,
            'atleta_id'=>1,
            'ejercicio_id'=>2,
            'sesion_id'=>1,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-02',
            'series'=>3,
            'repeticiones'=>5,
            'kilos'=>60,
            'atleta_id'=>1,
            'ejercicio_id'=>3,
            'sesion_id'=>1,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-02',
            'series'=>3,
            'repeticiones'=>10,
            'kilos'=>65,
            'atleta_id'=>1,
            'ejercicio_id'=>4,
            'sesion_id'=>1,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-02',
            'series'=>3,
            'repeticiones'=>10,
            'kilos'=>35,
            'atleta_id'=>1,
            'ejercicio_id'=>5,
            'sesion_id'=>1,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-02',
            'series'=>3,
            'repeticiones'=>10,
            'kilos'=>57.5,
            'atleta_id'=>1,
            'ejercicio_id'=>6,
            'sesion_id'=>1,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-02',
            'series'=>3,
            'repeticiones'=>15,
            'kilos'=>60,
            'atleta_id'=>1,
            'ejercicio_id'=>7,
            'sesion_id'=>1,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-02',
            'series'=>3,
            'repeticiones'=>15,
            'kilos'=>35,
            'atleta_id'=>1,
            'ejercicio_id'=>8,
            'sesion_id'=>1,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-02',
            'series'=>3,
            'repeticiones'=>15,
            'kilos'=>30,
            'atleta_id'=>1,
            'ejercicio_id'=>9,
            'sesion_id'=>1,
        ]);

        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-04',
            'series'=>3,
            'repeticiones'=>5,
            'kilos'=>95,
            'atleta_id'=>1,
            'ejercicio_id'=>10,
            'sesion_id'=>2,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-04',
            'series'=>3,
            'repeticiones'=>5,
            'kilos'=>35,
            'atleta_id'=>1,
            'ejercicio_id'=>11,
            'sesion_id'=>2,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-04',
            'series'=>3,
            'repeticiones'=>5,
            'kilos'=>60,
            'atleta_id'=>1,
            'ejercicio_id'=>12,
            'sesion_id'=>2,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-04',
            'series'=>3,
            'repeticiones'=>10,
            'kilos'=>65,
            'atleta_id'=>1,
            'ejercicio_id'=>13,
            'sesion_id'=>2,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-04',
            'series'=>3,
            'repeticiones'=>10,
            'kilos'=>35,
            'atleta_id'=>1,
            'ejercicio_id'=>14,
            'sesion_id'=>2,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-04',
            'series'=>3,
            'repeticiones'=>10,
            'kilos'=>57.5,
            'atleta_id'=>1,
            'ejercicio_id'=>15,
            'sesion_id'=>2,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-04',
            'series'=>3,
            'repeticiones'=>15,
            'kilos'=>60,
            'atleta_id'=>1,
            'ejercicio_id'=>16,
            'sesion_id'=>2,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-04',
            'series'=>3,
            'repeticiones'=>15,
            'kilos'=>35,
            'atleta_id'=>1,
            'ejercicio_id'=>17,
            'sesion_id'=>2,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-04',
            'series'=>3,
            'repeticiones'=>15,
            'kilos'=>30,
            'atleta_id'=>1,
            'ejercicio_id'=>18,
            'sesion_id'=>2,
        ]);

        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-06',
            'series'=>3,
            'repeticiones'=>5,
            'kilos'=>95,
            'atleta_id'=>1,
            'ejercicio_id'=>19,
            'sesion_id'=>3,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-06',
            'series'=>3,
            'repeticiones'=>5,
            'kilos'=>35,
            'atleta_id'=>1,
            'ejercicio_id'=>20,
            'sesion_id'=>3,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-06',
            'series'=>3,
            'repeticiones'=>5,
            'kilos'=>60,
            'atleta_id'=>1,
            'ejercicio_id'=>21,
            'sesion_id'=>3,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-06',
            'series'=>3,
            'repeticiones'=>10,
            'kilos'=>65,
            'atleta_id'=>1,
            'ejercicio_id'=>22,
            'sesion_id'=>3,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-06',
            'series'=>3,
            'repeticiones'=>10,
            'kilos'=>35,
            'atleta_id'=>1,
            'ejercicio_id'=>23,
            'sesion_id'=>3,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-06',
            'series'=>3,
            'repeticiones'=>10,
            'kilos'=>57.5,
            'atleta_id'=>1,
            'ejercicio_id'=>24,
            'sesion_id'=>3,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-06',
            'series'=>3,
            'repeticiones'=>15,
            'kilos'=>60,
            'atleta_id'=>1,
            'ejercicio_id'=>25,
            'sesion_id'=>3,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-06',
            'series'=>3,
            'repeticiones'=>15,
            'kilos'=>35,
            'atleta_id'=>1,
            'ejercicio_id'=>26,
            'sesion_id'=>3,
        ]);
        DB::table('lineas_sesion')->insert([
            'fecha'=>'2023-10-06',
            'series'=>3,
            'repeticiones'=>15,
            'kilos'=>30,
            'atleta_id'=>1,
            'ejercicio_id'=>27,
            'sesion_id'=>3,
        ]);

        // Crear Composicion corporal
        DB::table('composicion_corporal')->insert([
            'fecha'=>'2023-08-09',
            'altura'=>163,
            'peso'=>74.20,
            'atleta_id'=>1,
        ]);
    }
}
