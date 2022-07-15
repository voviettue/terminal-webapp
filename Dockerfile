FROM node:16-alpine

WORKDIR /app
ADD . /app/

RUN npm i
RUN npm run build

EXPOSE 3000

CMD npm run preview
