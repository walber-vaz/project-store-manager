const { Router } = require('express');
const { SaleController } = require('../controllers');
const {
  validateProductSale,
  validateQuantity,
  validateSaleNameProduct,
} = require('../middlewares/validatedSale');

class SaleRouter {
  constructor() {
    this.router = Router();
    this.router.post('/',
      validateSaleNameProduct,
      validateQuantity,
      validateProductSale,
      SaleController.insert);
    this.router.get('/', SaleController.findAll);
    this.router.get('/:id', SaleController.findById);
  }
}

module.exports = new SaleRouter().router;
