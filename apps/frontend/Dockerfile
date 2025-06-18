FROM stocksexample_base:latest as build

WORKDIR /usr/src/app/apps/frontend

COPY  package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY --from=build dist/aftas-angular /usr/share/nginx/html

EXPOSE 80
