const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { SaleModel, SaleProductModel } = require('../../../src/models');
const { SaleService } = require('../../../src/services');
const { mockAllSales, mockGetSale, mockGetSaleProducts, mockTemplateSale } = require('../mock/salesMock.mock');

describe('Service: SaleService', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getAllSales', () => {
    it('retorna todos os sales', async () => {
      sinon.stub(SaleModel, 'getAllSales').resolves(mockGetSale);
      sinon.stub(SaleProductModel, 'getAllSales').resolves(mockGetSaleProducts);

      const result = await SaleService.getAllSales();

      expect(result).to.be.deep.equal(mockAllSales);
    });
  });

  describe('getSaleById', () => {
    it('retorna um sale pelo id', async () => {
      sinon.stub(SaleModel, 'getSaleById').resolves(mockGetSale[0]);
      sinon.stub(SaleProductModel, 'getSaleById').resolves([mockGetSaleProducts[0]]);

      const result = await SaleService.getSaleById(1);

      // remove saleId
      const obj = { ...mockAllSales[0] }
      delete obj.saleId;

      expect(result).to.be.deep.equal([obj]);
    });

    it('retorna uma mesagem de erro quando o sale não é encontrado', async () => {
      sinon.stub(SaleModel, 'getSaleById').resolves(undefined);
      sinon.stub(SaleProductModel, 'getSaleById').resolves(undefined);

      const result = await SaleService.getSaleById(1000);

      expect(result).to.be.equal(undefined);
    });
  });

  describe('createSale', () => {
    it('retorna um sale criado', async () => {
      sinon.stub(SaleModel, 'createSale').resolves(3);
      sinon.stub(SaleProductModel, 'createProductSale').resolves(mockTemplateSale);

      const result = await SaleService.createSale(mockTemplateSale);

      expect(result).to.be.deep.equal(3);
    });
  });
});
