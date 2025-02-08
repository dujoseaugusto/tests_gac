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

### Inicializar com Docker

Para rodar a aplicação com Docker, utilize os comandos abaixo:

- **Iniciar aplicação normalmente:**

```bash
$ docker-compose up app --build -d
```

- **Iniciar aplicação com suporte a debug:**

```bash
$ docker-compose up_debug --build -d
```

## Logs e Monitoramento

### Configuração de Logs com Elasticsearch e Kibana

Este projeto utiliza o `winston` integrado com Elasticsearch para centralizar e monitorar logs de eventos. O Kibana é utilizado como ferramenta de visualização dos logs.

#### Configuração do Elasticsearch e Kibana

No arquivo `docker-compose.yaml`, já estão configurados os serviços do Elasticsearch e Kibana. Certifique-se de que ambos estão em execução:

```bash
$ docker-compose up app -d
```

- **Elasticsearch**: Disponível em `http://localhost:9200`
- **Kibana**: Disponível em `http://localhost:5601`

#### Acesso aos Logs

Os logs são enviados para o Elasticsearch com o índice `test_gac-logs` e podem ser visualizados no Kibana. Para acessar:

1. Abra o Kibana no navegador: [http://localhost:5601](http://localhost:5601).
2. Configure um padrão de índice no Kibana para `test_gac-logs`.
3. Explore os logs usando as ferramentas de consulta e visualização do Kibana.

### Middleware de Logs de Requisição

Foi implementado um middleware que registra todas as requisições HTTP com as seguintes informações:

- Método HTTP (GET, POST, etc.)
- URL da requisição
- Código de status da resposta
- Tempo de resposta
- Timestamp do evento

Os dados são enviados automaticamente para o Elasticsearch e podem ser monitorados no Kibana.

### Exemplo de Uso do Logger

O logger personalizado foi implementado usando o `winston` e está disponível para uso em toda a aplicação. Exemplo:

```typescript
import { logger } from './winston-logger.service';

logger.log('Informação importante');
logger.error('Erro crítico', 'Detalhes do stack trace');
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
Ou
$ docker-compose up app-test
```

## Recursos Disponíveis

- **Criação de Usuários**: Permite registrar novos usuários.
- **Autenticação**: Gera tokens JWT para autenticação segura.
- **Transferências**: Realiza transferências entre contas, com validação de saldo.
- **Consulta de Transações**: Exibe detalhes das transações realizadas.

## Endpoints

Acesse a documentação completa da API via Swagger após iniciar o servidor:

```
{{host}}/api
```

## Recursos Adicionais

- **Documentação do NestJS**: [https://docs.nestjs.com](https://docs.nestjs.com)
- **Canal no Discord**: [https://discord.gg/G7Qnnhy](https://discord.gg/G7Qnnhy)
- **Cursos Oficiais**: [https://courses.nestjs.com](https://courses.nestjs.com)

## Suporte

Este projeto é de código aberto. Caso tenha dúvidas ou sugestões, contribua abrindo uma issue ou enviando um pull request.

## Autor

Desenvolvido por José Augusto Batista, com o objetivo de criar uma aplicação escalável e eficiente para gerenciar transações financeiras.
