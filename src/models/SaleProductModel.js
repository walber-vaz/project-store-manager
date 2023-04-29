const connection = require('../db/connection');

class SaleProductModel {
  static async createProductSale(productId, saleId, quantity) {
    const [{ insertId }] = await connection.execute(
      `INSERT
      INTO sales_products (product_id, sale_id, quantity) VALUES (?, ?, ?);`,
      [productId, saleId, quantity],
    );
    return insertId;
  }

  static async getAllSales() {
    const [sales] = await connection.execute(
      `SELECT sale_id AS saleId, product_id as productId, quantity
      FROM sales_products;`,
    );
    return sales;
  }

  static async getSaleById(id) {
    const [sale] = await connection.execute(
      `SELECT sale_id AS saleId, product_id as productId, quantity
      FROM sales_products WHERE sale_id = ?;`,
      [id],
    );
    return sale;
  }

  static async updateProductSale(productId, quantity, saleId) {
    const update = await connection.execute(
      `UPDATE
      sales_products SET product_id = ?, quantity = ?
      WHERE product_id = ? AND sale_id = ?;`,
      [productId, quantity, productId, saleId],
    );

    const [{ insertId }] = update;
    return insertId;
  }
}

module.exports = SaleProductModel;
