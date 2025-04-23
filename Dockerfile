FROM nginx:1.27.5
WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]