FROM php:8.4-fpm AS composer

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ADD /composer.json /src/composer.json
ADD /composer.lock /src/composer.lock

RUN cd /src && composer install --no-dev --no-scripts

FROM node:24 AS modules

ADD /package.json /src/package.json
ADD /yarn.lock /src/yarn.lock

RUN cd /src && yarn

FROM node:24 AS build

ADD /package.json /src/package.json
ADD /yarn.lock /src/yarn.lock

COPY --from=modules /src/node_modules /src/node_modules

ADD /public /src/public
ADD /resources /src/resources
ADD /jsconfig.json /src/jsconfig.json
ADD /postcss.config.js /src/postcss.config.js
ADD /tailwind.config.js /src/tailwind.config.js
ADD /vite.config.mjs /src/vite.config.mjs

RUN cd /src && yarn build

# Official PHP image tracks security releases (e.g. 8.4.27).
# jkaninda/nginx-php-fpm:8.4 was stuck on PHP 8.4.10 and is effectively unmaintained.
FROM php:8.4-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && rm -f /etc/nginx/sites-enabled/default

ADD /nginx.conf /etc/nginx/conf.d/soketi-ui.conf

RUN mkdir -p /var/log/nginx /run/nginx \
    && sed -i 's|^\s*user\s\+.*;|user www-data;|' /etc/nginx/nginx.conf || true

ADD / /var/www/html
COPY --from=build /src/public /var/www/html/public
COPY --from=composer /src/vendor /var/www/html/vendor
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chown -R www-data:www-data /var/www/html \
    && chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /var/www/html
EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
