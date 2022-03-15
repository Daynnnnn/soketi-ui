# Soketi UI
A dashboard to manage your apps in Soketi.

## Requirements

 - PHP 8.0+
 - Node 16
 - Soketi running with a MySQL or PostgreSQL app manager
	 - DynamoDB support soon

## Installation
Currently, you'll need to clone down the repo, and run:

    n 16
    composer install --no-dev
    npm install
    npm run production
    
Then you'll need to setup the standard laravel environment variables (mainly your database connection details).

Next, you can run migrations with:

    php artisan migrate
This will create the soketi `apps` table, so currently if you have this, you will need to work around running the migrations.

## Screenshots
### Apps Index:
<img width="1728" alt="Screenshot 2022-03-15 at 17 31 51" src="https://user-images.githubusercontent.com/25618897/158437660-561d7fb9-8ef9-4d28-9413-78cee2c1b44e.png">

### App Credentials:
<img width="1728" alt="Screenshot 2022-03-15 at 17 31 55" src="https://user-images.githubusercontent.com/25618897/158437659-e82150a5-f5b7-4ceb-9a25-c64fa0f7c080.png">

### App Limits
<img width="1728" alt="Screenshot 2022-03-15 at 17 32 16" src="https://user-images.githubusercontent.com/25618897/158437657-e6901f61-d9d2-4ad8-9190-8f5d5ec44612.png">

### App Webhooks
<img width="1722" alt="Screenshot 2022-03-15 at 17 32 25" src="https://user-images.githubusercontent.com/25618897/158437652-c349cd4e-ad3d-423c-9c92-0eef378a0ab6.png">

### App Debug
<img width="1728" alt="Screenshot 2022-03-15 at 17 34 27" src="https://user-images.githubusercontent.com/25618897/158437643-02454b80-48cc-4b33-857d-e65e5f1002db.png">




