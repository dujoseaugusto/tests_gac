FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000 9229

CMD ["node", "--inspect=0.0.0.0:9229", "-r", "ts-node/register", "-r", "tsconfig-paths/register", "src/main.ts"]
