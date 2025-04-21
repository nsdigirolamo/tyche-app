FROM nginx:1.27.5
COPY dist /usr/share/nginix/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]