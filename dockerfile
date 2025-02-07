# Usa a imagem oficial do Node.js
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e instala as dependências
COPY package.json package-lock.json ./
RUN npm install

# Copia o código-fonte para dentro do container
COPY . .

# Expõe a porta que o NestJS usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
