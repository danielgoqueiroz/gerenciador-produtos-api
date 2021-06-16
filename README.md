# Gerenciador de produtos

## Descrição

Gerenciador de produtos, comentários e categorias, com controle e
autenticação de usuários.

### O Projeto

- Desenvolver uma API RESTful utilizando nodejs e banco de dados relacional.

- Cada produto deve pertencer a uma categoria pré registrada no sistema.

## Pré-requisitos

Ambiente de desenvolvimento/Testes - 19.3 Tricia

- Node v14.5.0: (https://nodejs.org/en/download/)
- - Check versão com `$ node --version`
- Npm 6.14.5: (https://docs.npmjs.com/getting-started)
- - Check versão com `npm --version`
- Docker 19.03.9 (https://docs.docker.com/engine/install/ubuntu/#installation-methods)
- - Check versão com `docker --version`

## Configuração

Após instalação dos pré-requisitos básicos, configurar banco de dados:

### Docker

Comando de configuração de banco de dados (Linux).

````
$ docker run --name ger_produtos -p 5432:5432 -e POSTGRES_PASSWORD=senha123 -d postgres
$ docker exec -it ger_produtos bash```
$ su postgres
$ psql
$ \conninfo
$ \q
````

### Get Starter

Instale modulos com:

```
$ npm i
```

Rode em desenvolvimento com:
(documentação será gerada automáticamente e estará disponível em 127.0.0.1:3000/ ):

```
$ npm run dev
```

Rode os testes com:

```
$ npm run test
```

## Descrição de funcionalidades

### Login

- (login) Login de usuário retornando um bearer token para utilizar nas chamadas abaixo

### Usuários (User)

- (store) Cadastrar usuário

### Categorias (Category)

- (store) Cadastrar categoria
- (update) Atualizar categoria
- (delete) Remover categoria
- (show) Exibir categoria
- (index) Listar categorias

### Produtos (Product)

- (store) Cadastrar produto
- (update) Atualizar produto
- (delete) Remover produto
- (show) Exibir produto
- (index) Listar produtos
- Filtrar por categorias

## Regras de negócio

- A data de fabricação (manufacturingDate) deve ser maior que a data de validade (expirationDate)
- A listagem de produtos deve permitir ordenação por campos e com paginação\* contesndo 10 produtos por página;
- Utilizar testes unitários e de integração;
- Documentação dos endpoints da API (sweagger) - Disponível em 127.0.0.1/;

\*Não foram testadas as variantes de ordenação para os campos;

## Referências utilizadas

- Node

https://nodejs.dev/learn/how-to-exit-from-a-nodejs-program

- Mocha (Teste)

https://mochajs.org/
https://www.luiztools.com.br/post/tdd-como-criar-integration-tests-em-node-js-com-jest/

- Postgres

https://www.postgresql.org/docs/9.1/sql-createtable.html
https://www.postgresqltutorial.com/postgresql-create-table/

- jwt (Login)

https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/

- Documentação (api)

https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284

- Docker

https://hub.dockedpcr.com/_/postgres/

## Helpers

Matar processos node no Windows

```
taskkill /im node.exe /F
```
