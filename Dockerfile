FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip nginx npm

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

RUN echo "Running composer install..." && composer install --no-dev --optimize-autoloader || { echo "Composer failed"; exit 1; }
RUN echo "Running npm install..." && npm install && npm run build || { echo "NPM failed"; exit 1; }

COPY nginx.conf /etc/nginx/sites-available/default
RUN rm -f /etc/nginx/sites-enabled/default && ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

COPY isrgrootx1.pem /usr/local/share/ca-certificates/tidb-root.crt
RUN update-ca-certificates

COPY php.ini /usr/local/etc/php/php.ini

RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www/storage

EXPOSE 80

COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh
CMD ["/usr/local/bin/start.sh"]