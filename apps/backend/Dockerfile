FROM stocksexample_base:latest AS build

WORKDIR /usr/src/app/apps/backend

COPY  package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]