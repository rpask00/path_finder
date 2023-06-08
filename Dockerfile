FROM node:16.14-alpine AS install

WORKDIR /app

COPY package.* ./

RUN npm install

COPY . .

RUN ./node_modules/.bin/ng build --configuration production

FROM nginx:latest


COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=install /app/dist/ /var/www/html
RUN rm -rf .git
