const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { mockAllSales, mockSaveResultSale, mockTemplateSale } = require('../mock/salesMock.mock');

describe('Testa o controller do sale', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Testa o controller findAll', () => {
    it('retorna todos os sales', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(saleService, 'getAllSales').resolves(mockAllSales);

      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockAllSales);
    });
  });

  describe('Testa o controller findById', () => {
    it('retorna um sale pelo id', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(saleService, 'getSaleById').resolves(mockAllSales[0]);

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockAllSales[0]);
    });

    it('retorna uma mesagem de erro quando o sale não é encontrado', async () => {
      const req = {
        params: {
          id: 4,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(saleService, 'getSaleById').resolves(undefined);

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Testa o controller create', () => {
    it('retorna um novo sale', async () => {
      const req = {
        body: mockTemplateSale,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };

      sinon.stub(saleService, 'createSale').resolves(4);

      await saleController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockSaveResultSale);
    });
  });
});
