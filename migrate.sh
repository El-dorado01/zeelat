#!/bin/bash

# Define flag file to track migrations
FLAG_FILE="/var/www/storage/.migrated"

# Check if flag file exists
if [ ! -f "$FLAG_FILE" ]; then
    echo "Dropping all tables and running migrations..."

    # Drop all tables and remigrate
    php artisan migrate:refresh --force
    if [ $? -ne 0 ]; then
        echo "Migration failed!"
        exit 1
    fi

    # Create storage symlink
    php artisan storage:link --force
    if [ $? -ne 0 ]; then
        echo "Storage link creation failed!"
        exit 1
    fi

    # Create flag file
    touch "$FLAG_FILE"
    echo "Flag file created at $FLAG_FILE. Migrations and storage link will not run again."
else
    echo "Flag file $FLAG_FILE exists. Skipping migrations and storage link."
fi