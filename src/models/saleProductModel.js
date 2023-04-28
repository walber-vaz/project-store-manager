const connection = require('../db/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id AS saleId, product_id as productId, quantity
    FROM sales_products;`,
  );
  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT sale_id AS saleId, product_id as productId, quantity
    FROM sales_products WHERE sale_id = ?;`, [id],
  );
  return sale;
};

const createProductSale = async (productId, saleId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (product_id, sale_id, quantity) VALUES (?, ?, ?);',
    [productId, saleId, quantity],
  );
  return insertId;
};

module.exports = {
  createProductSale,
  getAllSales,
  getSaleById,
};
