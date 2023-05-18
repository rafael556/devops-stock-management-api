# Primeiro estágio: constrói a imagem de compilação
FROM node:17-alpine AS build

USER node

WORKDIR /app

COPY yarn.lock ./

RUN yarn
COPY . .

# Compila a aplicação
RUN yarn build

FROM node:17-alpine

USER node
WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/yarn.lock .
COPY --from=build /app/dist ./dist

# Instala apenas as dependências de tempo de execução da aplicação
RUN yarn --production --silent

EXPOSE 9001

CMD [ "node", "dist/main" ]
