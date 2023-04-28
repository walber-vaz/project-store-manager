<div align="center">
  <img alt="Storage Manager" src="imgs/5ca10a0410f76.png" width="250px">
  <h1>Storage Manager - API</h1>
  <p>
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/walber-vaz/project-store-manager?color=blueviolet">
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/walber-vaz/project-store-manager?color=blueviolet">
    <img alt="GitHub" src="https://img.shields.io/github/license/walber-vaz/project-store-manager?color=blueviolet">
  </p>
</div>

## Descrição

E uma API que simula um sistema de gerenciamento de estoque de produtos.

## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Swagger](https://swagger.io/)

## Instalação

```bash
# Clone este repositório
$ git clone https://github.com/walber-vaz/project-store-manager.git

# Acesse a pasta do projeto no terminal/cmd
$ cd project-store-manager

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ docker-compose up -d

$ docker exec -it store_manager bash

$ npm run dev

# O servidor inciará na porta:3001 - acesse http://localhost:3001
```

## Rotas

### Produtos

#### GET /products

Retorna todos os produtos cadastrados.

#### GET /products/:id

Retorna um produto específico.

#### POST /products

Cadastra um novo produto.

#### PUT /products/:id

Atualiza um produto específico.

#### DELETE /products/:id

Deleta um produto específico.

### /sales

#### GET /sales

Retorna todas as vendas cadastradas.

#### GET /sales/:id

Retorna uma venda específica.

#### POST /sales

Cadastra uma nova venda.

#### PUT /sales/:id

Atualiza uma venda específica.

#### DELETE /sales/:id

Deleta uma venda específica.

## Documentação

A documentação da API foi feita utilizando o Swagger, para acessá-la basta acessar a rota http://localhost:3001/docs.

## Autor

- [Walber Vaz](https://github.com/walber-vaz)

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
