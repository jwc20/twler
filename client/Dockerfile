FROM node:19-alpine

WORKDIR /app/client/

COPY package*.json /app/client/
RUN npm install

COPY . /app/client/

CMD ["npm", "start"]
