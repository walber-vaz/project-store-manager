const { saleModel, saleProductModel } = require('../models');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  const salesProducts = await saleProductModel.getAllSales();

  sales.forEach((sale) => {
    const products = salesProducts.find((product) => product.saleId === sale.saleId);
    products.date = sale.date;
  });
  return salesProducts;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);
  const products = await saleProductModel.getSaleById(id);

  if (!sale) return;

  products.forEach((_, index) => {
    products[index].date = sale.date;
    delete products[index].saleId;
  });
  return products;
};

const createSale = async (products) => {
  const date = new Date();
  const saleId = await saleModel.createSale(date);

  const arr = [];

  products.forEach((product) => {
    const { productId, quantity } = product;
    const promise = new Promise((resolve) => {
      const result = saleProductModel.createProductSale(productId, saleId, quantity);
      resolve(result);
    });
    arr.push(promise);
  });
  await Promise.all(arr);
  return saleId;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
