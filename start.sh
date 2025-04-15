#!/bin/bash

echo "Container starting at $(date)..."
echo "Running migrate.sh..."
/usr/local/bin/migrate.sh
if [ $? -ne 0 ]; then
    echo "migrate.sh encountered errors, but continuing to start services for debugging."
fi

echo "Starting PHP-FPM..."
php-fpm -D || { echo "PHP-FPM failed to start"; exit 1; }

echo "Starting Nginx..."
nginx -g "daemon off;" || { echo "Nginx failed to start"; exit 1; }