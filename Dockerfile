#Base Image for mono repo builds
FROM node:22.12.0-alpine

WORKDIR /usr/src/app

COPY  package*.json ./
COPY  tsconfig.base.json ./
COPY  libs libs

RUN npm install

WORKDIR /usr/src/app/libs

RUN npm install
