# Primeiro estágio: constrói a imagem de compilação
FROM node:17-alpine AS build

USER node

WORKDIR /app

RUN yarn
COPY . .

# Compila a aplicação
RUN yarn build

EXPOSE 9001

CMD [ "yarn", "start:prod" ]
