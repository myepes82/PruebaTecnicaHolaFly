FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -D @swc/cli @swc/core
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4567

CMD ["npm", "start"]
