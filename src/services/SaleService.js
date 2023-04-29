/* eslint-disable consistent-return */
const { SaleModel, SaleProductModel } = require('../models');

class SaleService {
  static async getAllSales() {
    const sales = await SaleModel.getAllSales();
    const salesProducts = await SaleProductModel.getAllSales();

    return salesProducts.map(product => {
      const sale = sales.find(item => item.saleId === product.saleId);
      return {
        ...product,
        date: sale.date,
      };
    });
  }

  static async getSaleById(id) {
    const sale = await SaleModel.getSaleById(id);
    const products = await SaleProductModel.getSaleById(id);

    if (!sale) return;

    const updatedProducts = products
      .map(product => ({
        ...product,
        date: sale.date,
      }))
      .map(({ saleId, ...product }) => product);

    return updatedProducts;
  }

  static async createSale(products) {
    const date = new Date();
    const saleId = await SaleModel.createSale(date);

    const promises = products.map(({ productId, quantity }) =>
      SaleProductModel.createProductSale(productId, saleId, quantity),
    );

    await Promise.all(promises);
    return saleId;
  }

  static async updateSale(id, products) {
    const promises = products.map(({ productId, quantity }) =>
      SaleProductModel.updateProductSale(productId, quantity, id),
    );

    await Promise.all(promises);
    return true;
  }

  static async deleteSale(id) {
    await SaleModel.deleteSale(id);
  }
}

module.exports = SaleService;
