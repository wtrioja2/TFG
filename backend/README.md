# Lanzar el back en local

1. Instalar php
2. Instalar composer
3. Instalo xampp y lanzo apache y MySql
4. Instalar las dependencias con ```composer install```
5. Añado .env
6. Creo las migraciones a base de datos con ```php artisan migrate```
7. Añadir datos con ```php artisan db:seed --class=DatabaseSeeder```
8. Podemos añadir más usuarios aleatorios con ```php artisan db:seed --class=UsersTableSeeder```
9. Lanzo el back con ```php artisan serve```

