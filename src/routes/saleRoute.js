const { Router } = require('express');
const { saleController } = require('../controllers');
const {
  validateProductSale,
  validateQuantity,
  validateSaleNameProduct,
} = require('../middlewares/validatedSale');

const saleRouter = Router();

saleRouter.post('/',
  validateSaleNameProduct,
  validateQuantity,
  validateProductSale,
  saleController.insert);
saleRouter.get('/', saleController.findAll);
saleRouter.get('/:id', saleController.findById);

module.exports = saleRouter;
