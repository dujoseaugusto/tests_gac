FROM node:20

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências para instalar pacotes
COPY package.json package-lock.json ./
RUN npm install

# Copiar o código do projeto
COPY . .

# Expor as portas da aplicação e do debug
EXPOSE 3000 9229

# Configurar o comando para iniciar o modo de desenvolvimento com suporte a debug
CMD ["node", "--inspect=0.0.0.0:9229", "-r", "ts-node/register", "-r", "tsconfig-paths/register", "src/main.ts"]
