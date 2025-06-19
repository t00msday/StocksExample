FROM stocksexample_base:latest AS build

WORKDIR /usr/src/app/apps/frontend

COPY  package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY --from=build /usr/src/app/apps/frontend/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

