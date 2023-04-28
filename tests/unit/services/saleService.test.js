const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleModel, saleProductModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { mockAllSales, mockSaveResultSale, mockGetSale, mockGetSaleProducts, mockTemplateSale } = require('../mock/salesMock.mock');

describe('Service: saleService', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getAllSales', () => {
    it('retorna todos os sales', async () => {
      sinon.stub(saleModel, 'getAllSales').resolves(mockGetSale);
      sinon.stub(saleProductModel, 'getAllSales').resolves(mockGetSaleProducts);

      const result = await saleService.getAllSales();

      expect(result).to.be.deep.equal(mockAllSales);
    });
  });

  describe('getSaleById', () => {
    it('retorna um sale pelo id', async () => {
      sinon.stub(saleModel, 'getSaleById').resolves(mockGetSale[0]);
      sinon.stub(saleProductModel, 'getSaleById').resolves([mockGetSaleProducts[0]]);

      const result = await saleService.getSaleById(1);

      // remove saleId
      const obj = { ...mockAllSales[0] }
      delete obj.saleId;

      expect(result).to.be.deep.equal([obj]);
    });

    it('retorna uma mesagem de erro quando o sale não é encontrado', async () => {
      sinon.stub(saleModel, 'getSaleById').resolves(undefined);
      sinon.stub(saleProductModel, 'getSaleById').resolves(undefined);

      const result = await saleService.getSaleById(1000);

      expect(result).to.be.equal(undefined);
    });
  });

  describe('createSale', () => {
    it('retorna um sale criado', async () => {
      sinon.stub(saleModel, 'createSale').resolves(3);
      sinon.stub(saleProductModel, 'createProductSale').resolves(mockTemplateSale);

      const result = await saleService.createSale(mockTemplateSale);

      expect(result).to.be.deep.equal(3);
    });
  });
});
