#!/bin/bash

# Define flag file
FLAG_FILE="/var/www/storage/.migrated"

# Check if flag file exists
if [ -f "$FLAG_FILE" ]; then
    echo "Flag file $FLAG_FILE exists. Skipping migrations and storage link."
    exit 0
fi

echo "Flag file $FLAG_FILE not found. Proceeding with migrations and storage link..."

# Create flag file early to prevent reruns
touch "$FLAG_FILE" 2>/dev/null || {
    echo "Error: Cannot create flag file $FLAG_FILE. Check permissions for /var/www/storage."
    exit 1
}
echo "Flag file created at $FLAG_FILE."

# Run migrations with retry logic
echo "Running migrations..."
for attempt in {1..3}; do
    php artisan migrate:refresh --force && break
    echo "Migration attempt $attempt failed. Retrying in 5 seconds..."
    sleep 5
done

if [ $? -ne 0 ]; then
    echo "Migration failed after 3 attempts. Continuing to avoid loop."
fi

# Create storage symlink
echo "Creating storage link..."
php artisan storage:link --force
if [ $? -ne 0 ]; then
    echo "Storage link creation failed!"
fi

echo "Migration and storage link process completed. Flag file $FLAG_FILE prevents further runs."