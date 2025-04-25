FROM node:23-alpine3.20 as builder
WORKDIR /app

ENV VITE_API_ORIGIN="http://www.tyche.social/api"

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.27.5
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]