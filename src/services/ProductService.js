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

  static async updateProduct(id, name) {
    await ProductModel.updateProduct(id, name);
  }

  static async deleteProduct(id) {
    await ProductModel.deleteProduct(id);
  }

  static async findProductByName(name) {
    const product = await ProductModel.getAllProducts(name);
    return product.filter((item) => item.name.includes(name));
  }
}

module.exports = ProductService;
