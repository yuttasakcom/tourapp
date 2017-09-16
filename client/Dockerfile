FROM nginx:alpine

COPY nginx-config/nginx.conf /etc/nginx/nginx.conf
COPY nginx-config/conf.d /etc/nginx/conf.d
COPY nginx-config/snippets /etc/nginx/snippets
COPY nginx-config/ssl /etc/ssl
COPY ./web/build /data/www