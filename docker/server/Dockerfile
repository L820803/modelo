# Used for prod build.
FROM composer:2.6.6 AS vendor

ARG SERVER=./server

WORKDIR /var/www

COPY ${SERVER}/composer.json composer.json
COPY ${SERVER}/composer.lock composer.lock

RUN export COMPOSER_ALLOW_SUPERUSER=1 && composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist \
    --no-autoloader

FROM php:8.1-fpm as php

ARG WORK_DIR=/var/www

# Definir variáveis de ambiente
ENV PHP_OPCACHE_ENABLE=1
ENV PHP_OPCACHE_ENABLE_CLI=0
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS=0
ENV PHP_OPCACHE_REVALIDATE_FREQ=60

# Instalar dependências
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    apt-utils supervisor \
    zlib1g-dev \
    libzip-dev \
    unzip \
    libpng-dev \
    libpq-dev \
    libxml2-dev \
    nginx

# Instale extensões PHP
RUN docker-php-ext-install mysqli pdo pdo_mysql pdo_pgsql pgsql session xml gd

# Habilitar instalação do Redis
RUN pecl install redis-6.0.2 \
    && docker-php-ext-enable redis

# Copie o executável do compositor.
COPY --from=composer:2.6.6 /usr/bin/composer /usr/bin/composer

# Copie os arquivos de configuração.
COPY ./docker/server/php.ini /usr/local/etc/php/php.ini
COPY ./docker/server/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf
COPY ./docker/server/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/server/entrypoint.sh /usr/src/app/entrypoint.sh

RUN chmod +x /usr/src/app/entrypoint.sh

# Defina o diretório de trabalho como /var/www.
WORKDIR ${WORK_DIR}

# Copie os arquivos da pasta atual para a pasta atual do contêiner (definida em workdir)
COPY --chown=www-data:www-data ./server .
COPY --from=vendor ${WORK_DIR}/vendor/ ${WORK_DIR}/vendor/

# Corrigir a propriedade dos arquivos.
RUN chown -R www-data ${WORK_DIR}/storage
#RUN chown -R www-data ${WORK_DIR}/storage/framework
#RUN chown -R www-data ${WORK_DIR}/storage/framework/sessions

# Defina a permissão correta.
RUN chmod -R 755 ${WORK_DIR}/storage
#RUN chmod -R 755 ${WORK_DIR}/storage/logs
#RUN chmod -R 755 ${WORK_DIR}/storage/framework
#RUN chmod -R 755 ${WORK_DIR}/storage/framework/sessions
RUN chmod -R 755 ${WORK_DIR}/bootstrap

# Ajustar permissão e grupo do usuário
RUN usermod --uid 1000 www-data
RUN groupmod --gid 1001 www-data

# Execute o arquivo do ponto de entrada.
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
