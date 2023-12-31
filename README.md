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

[Soketi Documentation](https://docs.soketi.app/app-management/sql-drivers/mysql)

Finally, you can run migrations with:

    php artisan migrate

## Installation (Docker)
If you're using docker, you can use the [docker compose file](https://github.com/Daynnnnn/soketi-ui/blob/main/docker-compose.yml) to get running quickly.

You'll still need to run migrations manually, with the same steps as the above installation

## Screenshots
<img width="846" alt="Screenshot 2023-12-31 at 12 55 11" src="https://github.com/Daynnnnn/soketi-ui/assets/25618897/502afea9-de7c-4916-881b-5c635e55cd0f">
<img width="938" alt="Screenshot 2023-12-31 at 12 55 24" src="https://github.com/Daynnnnn/soketi-ui/assets/25618897/f075815f-1d54-4929-829d-bc22de37b486">
<img width="836" alt="Screenshot 2023-12-31 at 12 58 40" src="https://github.com/Daynnnnn/soketi-ui/assets/25618897/4c7eb64b-8b7f-4aab-a0c4-a959d07d6d19">
