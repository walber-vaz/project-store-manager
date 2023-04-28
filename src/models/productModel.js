const connection = require('../db/connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product[0];
};

module.exports = {
  getAllProducts,
  getProductById,
};
