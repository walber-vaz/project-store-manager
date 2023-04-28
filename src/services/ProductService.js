const { ProductModel } = require('../models');

class ProductService {
  static async findAllProducts() {
    const products = await ProductModel.getAllProducts();
    return products;
  }

  static async findProductById(id) {
    const product = await ProductModel.getProductById(id);
    return product;
  }

  static async createProduct(name) {
    const product = await ProductModel.createProduct(name);
    return product;
  }
}

module.exports = ProductService;
