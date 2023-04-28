const { productService } = require('../services');

const findAll = async (req, res) => {
  const products = await productService.findAllProducts();
  return res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findProductById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const product = await productService.createProduct(name);
  return res.status(201).json({ id: product, name });
};

module.exports = {
  findAll,
  findById,
  insert,
};
