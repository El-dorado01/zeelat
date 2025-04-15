FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    npm

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Configure Nginx
COPY nginx.conf /etc/nginx/sites-available/default
RUN rm -f /etc/nginx/sites-enabled/default && ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

# Copy TiDB CA certificate
COPY isrgrootx1.pem /usr/local/share/ca-certificates/tidb-root.crt
RUN update-ca-certificates

# Copy PHP config
COPY php.ini /usr/local/etc/php/php.ini

# Permissions
RUN chown -R www-data:www-data /var/www
RUN chmod -R 775 /var/www/storage
RUN chmod -R 775 /var/www/bootstrap/cache

# Copy and configure scripts
COPY migrate.sh /usr/local/bin/migrate.sh
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/migrate.sh /usr/local/bin/start.sh

# Expose port
EXPOSE 80

# Start container
CMD ["/usr/local/bin/start.sh"]