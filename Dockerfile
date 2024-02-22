FROM node:19.8.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i

COPY public/ ./public/
RUN npm run sass

COPY src/ ./src/

CMD ["npm", "start"]
