# Soketi UI
A dashboard to manage your apps in Soketi.

## Requirements

 - PHP 8.2+
 - Node 18
 - Soketi running with a MySQL or PostgreSQL app manager

## Installation
Currently, you'll need to clone down the repo, and run:

    n 18
    composer install --no-dev
    yarn
    yarn build
    
Then you'll need to setup the standard laravel environment variables (mainly your database connection details).

Soketi UI won't create the apps table, so you'll need to create it before running migrations:
https://docs.soketi.app/app-management/sql-drivers/mysql

Finally, you can run migrations with:

    php artisan migrate

## Screenshots
