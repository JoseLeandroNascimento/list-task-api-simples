FROM node:alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node


EXPOSE 3040

CMD ["nest","start"]