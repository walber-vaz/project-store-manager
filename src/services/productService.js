const { productModel } = require('../models');

const findAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

const findProductById = async (id) => {
  const product = await productModel.getProductById(id);

  if (!product) return { message: 'Product not found' };

  return product;
};

module.exports = {
  findAllProducts,
  findProductById,
};
