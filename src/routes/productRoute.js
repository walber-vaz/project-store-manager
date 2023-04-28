const { Router } = require('express');
const { productController } = require('../controllers');
const validatedProductName = require('../middlewares/validatedProduct');

const productRouter = Router();

productRouter.post('/', validatedProductName, productController.insert);
productRouter.get('/', productController.findAll);
productRouter.get('/:id', productController.findById);

module.exports = productRouter;
