const mockAllSales = [
  {
    saleId: 1,
    date: "2023-04-27T03:00:00.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 2,
    date: "2023-04-27T03:00:00.000Z",
    productId: 2,
    quantity: 2,
  },
];

const mockGetSale = [
  { saleId: 1, date: "2023-04-27T03:00:00.000Z" },
  { saleId: 2, date: "2023-04-27T03:00:00.000Z" },
];

const mockGetSaleProducts = [
  { saleId: 1, productId: 1, quantity: 2 },
  { saleId: 2, productId: 2, quantity: 2 },
];

const mockTemplateSale = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
];

const mockSaveResultSale = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 5,
    },
    {
      productId: 2,
      quantity: 10,
    },
  ],
};

module.exports = {
  mockAllSales,
  mockGetSale,
  mockGetSaleProducts,
  mockTemplateSale,
  mockSaveResultSale,
};
