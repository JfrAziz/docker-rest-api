FROM node AS build

WORKDIR /app

COPY . .

RUN npm install

FROM node:alpine

COPY --from=build /app /

EXPOSE 3000

CMD ["node", "server.js"]

