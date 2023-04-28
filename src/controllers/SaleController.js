const { SaleService } = require('../services');

class SaleController {
  static async findAll(req, res) {
    const sales = await SaleService.getAllSales();

    return res.status(200).json(sales);
  }

  static async findById(req, res, next) {
    const { id } = req.params;
    const sale = await SaleService.getSaleById(id);

    if (!sale) {
      return next({ status: 404, message: 'Sale not found' });
    }

    return res.status(200).json(sale);
  }

  static async insert(req, res) {
    const sale = req.body;
    const newSale = await SaleService.createSale(sale);

    const newSaleObj = {
      id: newSale,
      itemsSold: [...sale],
    };

    return res.status(201).json(newSaleObj);
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    const sale = await SaleService.getSaleById(id);

    if (!id || !sale) {
      return next({ status: 404, message: 'Sale not found' });
    }

    await SaleService.deleteSale(id);
    return res.status(204).end();
  }
}

module.exports = SaleController;
