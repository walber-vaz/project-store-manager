const { productModel } = require('../models');

const findAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

const findProductById = async (id) => {
  const product = await productModel.getProductById(id);
  return product;
};

module.exports = {
  findAllProducts,
  findProductById,
};
