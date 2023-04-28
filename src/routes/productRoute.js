const { Router } = require('express');
const { productController } = require('../controllers');

const productRouter = Router();

productRouter.get('/', productController.findAll);
productRouter.get('/:id', productController.findById);

module.exports = productRouter;
