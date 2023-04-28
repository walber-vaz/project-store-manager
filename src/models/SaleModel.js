const connection = require('../db/connection');

class SaleModel {
  static async getAllSales() {
    const [sales] = await connection.execute(
      'SELECT id as saleId, date FROM sales;',
    );
    return sales;
  }

  static async getSaleById(id) {
    const [sale] = await connection.execute(
      'SELECT id as saleId, date FROM sales WHERE id = ?;', [id],
    );
    return sale[0];
  }

  static async createSale(date) {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO sales (date) VALUES (?);', [date],
    );
    return insertId;
  }

  static async deleteSale(id) {
    await connection.execute('DELETE FROM sales WHERE id = ?;', [id]);
  }
}

module.exports = SaleModel;
