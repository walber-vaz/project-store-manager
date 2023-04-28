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

| ROTAS              	| METHOD 	| DESCRIPTION        	|
|--------------------	|--------	|--------------------	|
| /products          	| POST   	| Create one product 	|
| /products          	| GET    	| List all products  	|
| /products/search?q 	| GET    	| Search product     	|
| /products/:id      	| PUT    	| Update one product 	|
| /products/:id      	| GET    	| List one product   	|
| /products/:id      	| DELETE 	| Delete one product 	|
| /sales             	| POST   	| Create one sale    	|
| /sales             	| GET    	| List all sales     	|
| /sales/:id         	| GET    	| List one sale      	|
| /sales/:id         	| PUT    	| Update one sale    	|
| /sales/:id         	| DELETE 	| Delete one sale    	|

## Documentação

A documentação da API foi feita utilizando o Swagger, para acessá-la basta acessar a rota http://localhost:3001/docs.

## Autor

- [Walber Vaz](https://github.com/walber-vaz)

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
