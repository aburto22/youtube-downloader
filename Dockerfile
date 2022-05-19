FROM node:16

RUN apt-get update 

RUN apt-get upgrade -y

RUN apt-get install python3 python3-pip apt-get install ffmpeg libavcodec-extra -y

WORKDIR /app/python

COPY python/requirements.txt ./

RUN pip3 install -r requirements.txt

COPY python/. .

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