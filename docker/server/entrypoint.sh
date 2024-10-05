#!/bin/bash

if [ ! -f "vendor/autoload.php" ]; then
    composer install --no-progress --no-interaction
fi

if [ ! -f ".env" ]; then
    echo "Creating env file for env $APP_ENV"
    cp .env.example .env
else
    echo "env file exists."
fi

php artisan key:generate --no-interaction
php artisan migrate:refresh
php artisan db:seed
php artisan optimize
php artisan view:clear

echo "Setting permissions and ownership"
chown -R www-data:www-data /var/www/storage
chown -R www-data:www-data /var/www/bootstrap
chmod -R 755 /var/www/storage
chmod -R 755 /var/www/storage/logs
chmod -R 755 /var/www/storage/framework
chmod -R 755 /var/www/storage/framework/sessions

php-fpm -D
nginx -g "daemon off;"
