Introdução
Criar um gerenciador de produtos, comentários e categorias, com controle e
autenticação de usuários.
O Projeto
Desenvolver uma API RESTful utilizando nodejs e banco de dados relacional. Cada
produto deve pertencer a uma categoria pré registrada no sistema.
Funcionalidades
● Usuários
○ (store) Cadastrar usuário
○ (login) Login de usuário retornando um bearer token para utilizar nas
chamadas abaixo
● Categorias
○ (store) Cadastrar categoria
○ (update) Atualizar categoria
○ (delete) Remover categoria
○ (show) Exibir categoria
○ (index) Listar categorias
● Produtos
○ (store) Cadastrar produto
○ (update) Atualizar produto
○ (delete) Remover produto
○ (show) Exibir produto
○ (index) Listar produtos
■ Filtrar por categorias
Exemplo de produto
{
"id": 1,
"categoryId": 2,
"name": "product 1",
"manufacturingDate": "2020-07-17T12:55:33.000Z",
"perishableProduct": true,
"expirationDate": "2020-07-27T12:55:33.000Z",
"price": 120,
}
Regras de negócio
● A data de fabricação nunca deve ser maior que a data de validade;
● O Preço do produto deverá ser registrado com 2 casas decimais;
● A listagem deve ter a possibilidade de ordenação dos campos e com uma paginação
de 10 produtos por página.
Diferenciais
● Utilizar testes unitários e de integração;
● Documentação dos endpoints da API;
● Front-end é opcional.

# Documentações

## Node

https://nodejs.dev/learn/how-to-exit-from-a-nodejs-program
