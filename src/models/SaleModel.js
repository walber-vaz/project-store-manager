const connection = require('../db/connection');

// const getAllSales = async () => {
//   const [sales] = await connection.execute(
//     'SELECT id as saleId, date FROM sales;',
//   );
//   return sales;
// };

// const getSaleById = async (id) => {
//   const [sale] = await connection.execute(
//     'SELECT id as saleId, date FROM sales WHERE id = ?;', [id],
//   );
//   return sale[0];
// };

// const createSale = async (date) => {
//   const [{ insertId }] = await connection.execute(
//     'INSERT INTO sales (date) VALUES (?);', [date],
//   );
//   return insertId;
// };

// module.exports = {
//   getAllSales,
//   getSaleById,
//   createSale,
// };

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
}

module.exports = SaleModel;
