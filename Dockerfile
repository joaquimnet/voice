FROM node:14-alpine3.10

COPY . .

RUN npm install

CMD ["npm", "start"]