
# Transactions API

## Descrição

Este projeto é uma API para gerenciar transações entre usuários, desenvolvida com o framework [NestJS](https://nestjs.com). A API permite criar usuários, autenticar, realizar transferências financeiras e consultar saldos.

## Configuração do Projeto

### Instalação

Clone o repositório e instale as dependências:

```bash
$ git clone <url-do-repositorio>
$ cd <nome-do-diretorio>
$ npm install
```

### Configuração do Banco de Dados

Certifique-se de ter o PostgreSQL instalado. Configure o banco de dados no arquivo `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
JWT_SECRET=sua_chave_secreta
```

### Inicializar a Aplicação

```bash
# Ambiente de desenvolvimento
$ npm run start

# Modo de observação
$ npm run start:dev

# Modo de produção
$ npm run start:prod
```

## Executar Testes

### Testes Unitários

```bash
$ npm run test
```

### Testes End-to-End

```bash
$ npm run test:e2e
```

### Cobertura de Testes

```bash
$ npm run test:cov
```

### Testes com Docker

Certifique-se de que o Docker esteja instalado. Use o comando abaixo para rodar os testes com o ambiente configurado via Docker:

```bash
$ docker-compose up --build
$ docker exec -it <container_name> npm run test
```

## Recursos Disponíveis

- **Criação de Usuários**: Permite registrar novos usuários.
- **Autenticação**: Gera tokens JWT para autenticação segura.
- **Transferências**: Realiza transferências entre contas, com validação de saldo.
- **Consulta de Transações**: Exibe detalhes das transações realizadas.

## Endpoints

Acesse a documentação completa da API via Swagger após iniciar o servidor:

```
http://localhost:3000/api
```

## Recursos Adicionais

- **Documentação do NestJS**: [https://docs.nestjs.com](https://docs.nestjs.com)
- **Canal no Discord**: [https://discord.gg/G7Qnnhy](https://discord.gg/G7Qnnhy)
- **Cursos Oficiais**: [https://courses.nestjs.com](https://courses.nestjs.com)

## Suporte

Este projeto é de código aberto e licenciado sob o MIT. Caso tenha dúvidas ou sugestões, contribua abrindo uma issue ou enviando um pull request.

## Autor

Desenvolvido por **[Seu Nome]**, com o objetivo de criar uma aplicação escalável e eficiente para gerenciar transações financeiras.

---

**Licença**: Este projeto está licenciado sob a licença [MIT](LICENSE).