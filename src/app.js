const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./docs/swagger.json');
const { ProductRouter, SaleRouter } = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductRouter);
app.use('/sales', SaleRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, _req, res, _next) => res.status(err.status).json({ message: err.message }));

module.exports = app;
