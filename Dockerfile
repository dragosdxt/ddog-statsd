FROM node:6-alpine

ENV NODE_ENV production

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /app

CMD ["node", "app.js"] 
