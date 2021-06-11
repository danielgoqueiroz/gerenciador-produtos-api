## Descrição

Gerenciador de produtos, comentários e categorias, com controle e
autenticação de usuários.

## Pré-requisitos

Node v14.5.0
Npm 6.14.5
Docker

## Configuração

### Docker

Exceutar comandos para iniciar banco de dados:

docker run --name ger_produtos -p 5432:5432 -e POSTGRES_PASSWORD=senha123 -d postgres

docker exec -it ger_produtos bash

su postgres

psql

\conninfo

\q

### O Projeto

Desenvolver uma API RESTful utilizando nodejs e banco de dados relacional.

Cada produto deve pertencer a uma categoria pré registrada no sistema.

Funcionalidades

### Usuários (User)

- (store) Cadastrar usuário
- (login) Login de usuário retornando um bearer token para utilizar nas chamadas abaixo

User

```
{
    name: string,
    password: string
}
```

### Categorias (Category)

- (store) Cadastrar categoria
- (update) Atualizar categoria
- (delete) Remover categoria
- (show) Exibir categoria
- (index) Listar categorias

```
{
    id: number,
    description: string
}
```

### Produtos (Product)

- (store) Cadastrar produto
- (update) Atualizar produto
- (delete) Remover produto
- (show) Exibir produto
- (index) Listar produtos
  ■ Filtrar por categorias

  Exemplo de produto:

  ```
  {
    "id": number,
    "categoryId": number,
    "name": string,
    "manufacturingDate": date, // Formatação yyyy-MM-ddTHH:mm:ss.SZ ex: 2020-07-27T12:55:33.000Z
    "perishableProduct": boolean,
    "expirationDate": date,
    "price": int,
  }
  ```

  Validações:

- A data de fabricação (manufacturingDate) deve ser maior que a data de validade (expirationDate)
- A listagem de produtos deve permitir ordenação por campos e com paginação contendo 10 produtos por página;

  ### Regras de negócio

Diferenciais

- Deve atender as regras de validação informadas;
- Utilizar testes unitários e de integração;
- Documentação dos endpoints da API (sweagger);

# Infos adicionais

## Docker

docker run --name ger_produtos -e POSTGRES_PASSWORD=dynamox -d postgres

# Referências

## Node

https://nodejs.dev/learn/how-to-exit-from-a-nodejs-program

# Mocha (Teste)

https://mochajs.org/
https://www.luiztools.com.br/post/tdd-como-criar-integration-tests-em-node-js-com-jest/

# Postgres

https://www.postgresql.org/docs/9.1/sql-createtable.html
https://www.postgresqltutorial.com/postgresql-create-table/

### jwt (Login)

https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/

## Documentação (api)

https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284

## Docker

https://hub.dockedpcr.com/_/postgres/
