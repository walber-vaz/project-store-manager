const { Router } = require('express');
const { ProductController } = require('../controllers');
const { validatedProductName, validatedProductParams } = require('../middlewares/validatedProduct');

class ProductRoute {
  constructor() {
    this.router = Router();
    this.router.post('/', validatedProductName, ProductController.insert);
    this.router.get('/', ProductController.findAll);
    this.router.get('/:id', ProductController.findById);
    this.router.put('/:id', validatedProductParams, ProductController.update);
    this.router.delete('/:id', ProductController.delete);
  }
}

module.exports = new ProductRoute().router;
