#!/bin/bash

# Run migrations and storage link
echo "Running migrate.sh..."
/usr/local/bin/migrate.sh
if [ $? -ne 0 ]; then
    echo "migrate.sh failed!"
    exit 1
fi

# Start PHP-FPM
echo "Starting PHP-FPM..."
php-fpm -D || { echo "PHP-FPM failed to start"; exit 1; }

# Start Nginx
echo "Starting Nginx..."
nginx -g "daemon off;" || { echo "Nginx failed to start"; exit 1; }