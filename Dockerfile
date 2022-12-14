FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --production

EXPOSE 8000

CMD ["node", "app.js" ]