FROM nginx:alpine

COPY nginx-config/nginx.conf /etc/nginx/nginx.conf
COPY nginx-config/conf.d /etc/nginx/conf.d
COPY ./company-web/build /data/www/company-web
COPY ./agent-web/build /data/www/agent-web