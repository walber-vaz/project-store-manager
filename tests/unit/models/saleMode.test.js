const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { SaleModel } = require('../../../src/models');
const connection = require('../../../src/db/connection');
const { mockAllSales, mockTemplateSale } = require('../mock/salesMock.mock');

describe('Testa o model do sale', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Testa o model getAllSales', () => {
    it('retorna todos os sales', async () => {
      sinon.stub(connection, 'execute').resolves([mockAllSales]);

      const result = await SaleModel.getAllSales();

      expect(connection.execute).to.be.calledOnce;
      expect(connection.execute).to.be.calledWith('SELECT id as saleId, date FROM sales;');
      expect(result).to.be.equal(mockAllSales);
    });
  });

  describe('Testa o model getSaleById', () => {
    it('retorna um sale pelo id', async () => {
      sinon.stub(connection, 'execute').resolves([[mockAllSales[0]]]);

      const result = await SaleModel.getSaleById(1);

      expect(connection.execute).to.be.calledOnce;
      expect(connection.execute).to.be.calledWith('SELECT id as saleId, date FROM sales WHERE id = ?;', [1]);
      expect(result).to.be.equal(mockAllSales[0]);
    });

    it('retorna uma mesagem de erro quando o sale não é encontrado', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await SaleModel.getSaleById(1000);

      expect(connection.execute).to.be.calledOnce;
      expect(connection.execute).to.be.calledWith('SELECT id as saleId, date FROM sales WHERE id = ?;', [1000]);
      expect(result).to.be.equal(undefined);
    });
  });

  describe('Testa o model createSale', () => {
    it('retorna o id do sale criado', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await SaleModel.createSale(mockTemplateSale);
      await SaleModel.createSale(mockTemplateSale);

      expect(result).to.be.equal(3);
      expect(connection.execute).to.have.been.calledTwice;
      expect(connection.execute).to.be.calledWith('INSERT INTO sales (date) VALUES (?);', [mockTemplateSale]);
    });
  });
});
