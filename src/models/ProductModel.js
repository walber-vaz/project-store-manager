const connection = require('../db/connection');

class ProductModel {
  static async getAllProducts() {
    const [products] = await connection.execute('SELECT * FROM products;');
    return products;
  }

  static async getProductById(id) {
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?;', [id]);
    return product[0];
  }

  static async createProduct(name) {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO products (name) VALUES (?);', [name],
    );
    return insertId;
  }
}

module.exports = ProductModel;
