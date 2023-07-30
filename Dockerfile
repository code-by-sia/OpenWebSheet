FROM node 
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

COPY . ./

RUN mkdir dist
RUN npm run copy-assets


ENTRYPOINT [ "npm", "start" ]
EXPOSE 1234
