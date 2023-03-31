FROM node:19-alpine

WORKDIR /app/client/

RUN npm install -g react-scripts

COPY package*.json /app/client/
RUN npm install

COPY . /app/client/

CMD ["npm", "run", "dev"]
