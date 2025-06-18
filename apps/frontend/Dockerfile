FROM node:22.12.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY --from=build dist/aftas-angular /usr/share/nginx/html

EXPOSE 80
