# Primeiro estágio: constrói a imagem de compilação
FROM node:17-alpine AS build

# Define o usuário não-root para o estágio de compilação
USER node

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./
COPY yarn.lock ./

# Instala as dependências da aplicação
RUN npm install --production --silent

# Copia todo o código fonte para o diretório de trabalho
COPY ./ ./

# Compila a aplicação
RUN npm run build

# Segundo estágio: cria a imagem final
FROM node:17-alpine

# Define o usuário não-root para a imagem final
USER node

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários da imagem de compilação
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Instala apenas as dependências de tempo de execução da aplicação
RUN npm install --production --silent

# Expõe a porta que a aplicação está ouvindo
EXPOSE 9001

# Define o comando padrão que será executado quando o container for iniciado
CMD [ "node", "dist/main" ]
