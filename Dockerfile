FROM node:20.5.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3002"]

EXPOSE 3002

