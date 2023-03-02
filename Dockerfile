FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
