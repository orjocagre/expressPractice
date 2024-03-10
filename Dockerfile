FROM node:21

WORKDIR /home/node/app

COPY ./package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV DB_USER='admin'
ENV DB_PASSWORD='admin123'
ENV DB_HOST=postgres
ENV DB_NAME='my_store'
ENV DB_PORT='5432'
ENV DATABASE_URL='postgres://admin:admin123@localhost:5432/my_store'


EXPOSE 3000

CMD [ "npm", "start" ]
