const { Router } = require('express');
const { ProductController } = require('../controllers');
const validatedProductName = require('../middlewares/validatedProduct');

class ProductRoute {
  constructor() {
    this.router = Router();
    this.router.post('/', validatedProductName, ProductController.insert);
    this.router.get('/', ProductController.findAll);
    this.router.get('/:id', ProductController.findById);
  }
}

module.exports = new ProductRoute().router;
