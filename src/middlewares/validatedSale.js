const { ProductService } = require('../services');

const validateSaleNameProduct = (req, res, next) => {
  const sale = req.body;
  const isValid = ['productId', 'quantity'].find(key =>
    sale.some(item => !(key in item)),
  );

  if (isValid) {
    return res.status(400).json({ message: `"${isValid}" is required` });
  }

  return next();
};

const validateProductSale = async (req, res, next) => {
  const sale = req.body;
  const allProducts = await ProductService.findAllProducts();

  const isValid = sale.some(item => {
    const product = allProducts.find(index => index.id === item.productId);
    return product === undefined;
  });

  if (isValid) return res.status(404).json({ message: 'Product not found' });

  return next();
};

const validateQuantity = (req, res, next) => {
  const sale = req.body;
  const isValid = sale.some(item => item.quantity < 1);

  if (isValid) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

module.exports = {
  validateSaleNameProduct,
  validateProductSale,
  validateQuantity,
};
