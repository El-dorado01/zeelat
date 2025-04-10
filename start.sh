#!/bin/bash
php artisan config:clear || echo "Config clear failed"
php artisan route:clear || echo "Route clear failed"
php-fpm -D
nginx -g "daemon off;"
