#!/bin/bash
echo "Starting PHP-FPM..."
php-fpm -D || { echo "PHP-FPM failed to start"; exit 1; }
echo "Starting Nginx..."
nginx -g "daemon off;" || { echo "Nginx failed to start"; exit 1; }