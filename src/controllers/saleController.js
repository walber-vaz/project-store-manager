const { saleService } = require('../services');

const findAll = async (req, res) => {
  const sales = await saleService.getAllSales();

  return res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getSaleById(id);

  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(sale);
};

const insert = async (req, res) => {
  const sale = req.body;
  const newSale = await saleService.createSale(sale);

  const newSaleObj = {
    id: newSale,
    itemsSold: [...sale],
  };

  return res.status(201).json(newSaleObj);
};

module.exports = {
  findAll,
  findById,
  insert,
};
