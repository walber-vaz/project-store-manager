const express = require('express');
const { productRouter } = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

module.exports = app;
