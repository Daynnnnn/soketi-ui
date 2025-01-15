FROM php:8.2-fpm as composer

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ADD /composer.json /src/composer.json
ADD /composer.lock /src/composer.lock

RUN cd /src && composer install --no-dev --no-scripts

FROM node:18 as modules

ADD /package.json /src/package.json
ADD /yarn.lock /src/yarn.lock

RUN cd /src && yarn

FROM node:18 as build

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

FROM jkaninda/nginx-php-fpm:8.2

ADD /nginx.conf /var/www/html/conf/nginx/nginx-site.conf

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

ADD / /var/www/html
COPY --from=build /src/public /var/www/html/public
COPY --from=composer /src/vendor /var/www/html/vendor

RUN chown -R 1000:1000 /var/www/html

# Set working directory
WORKDIR /var/www/html
