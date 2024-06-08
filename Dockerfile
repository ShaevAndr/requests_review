FROM node:22.2.0-alpine


WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD node dist/main.js
