FROM node:16

RUN apt-get update 

RUN apt-get upgrade -y

RUN apt-get install python3 -y

RUN apt-get install python3-pip -y

RUN pip3 install pytube

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

COPY client/. .

RUN npm run build

WORKDIR /app/server

COPY server/package*.json ./

RUN npm install

COPY server/. .

CMD ["npm", "start"]