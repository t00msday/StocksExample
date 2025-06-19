FROM stocksexample_base:latest AS build

ENV FINNHUB_API_KEY=

WORKDIR /usr/src/app/apps/backend

COPY  package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]