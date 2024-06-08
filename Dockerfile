FROM node:22.2.0-alpine


WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma

RUN npm run build


