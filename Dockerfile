FROM node:16.15

RUN apt-get update 

RUN apt-get install python -y

RUN apt-get install python3-pip -y

RUN python3 -m pip install pytube

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