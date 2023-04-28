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

  static async updateProduct(id, name) {
    await connection.execute('UPDATE products SET name = ? WHERE id = ?;', [name, id]);
  }

  static async deleteProduct(id) {
    await connection.execute('DELETE FROM products WHERE id = ?;', [id]);
  }
}

module.exports = ProductModel;
