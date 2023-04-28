const express = require('express');
const { ProductRouter, saleRouter } = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductRouter);
app.use('/sales', saleRouter);

app.use((err, _req, res, _next) => res.status(err.status).json({ message: err.message }));

module.exports = app;
