const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const findAllProduct = require('../mock/findAllProduct.mock');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/db/connection');

describe('Testa o model do product', () => {
  afterEach(async () => {
    sinon.restore();
  });

  describe('Testa o model findAll', () => {
    it('retorna todos os produtos', async () => {
      sinon.stub(connection, 'execute').resolves([findAllProduct]);

      const result = await productModel.getAllProducts();

      expect(connection.execute).to.be.calledOnce;
      expect(connection.execute).to.be.calledWith('SELECT * FROM products;');
      expect(result).to.be.equal(findAllProduct);
    });
  });

  describe('Testa o model findById', () => {
    it('retorna um produto pelo id passado', async () => {
      sinon.stub(connection, 'execute').resolves([[findAllProduct[0]]]);

      const result = await productModel.getProductById(1);

      expect(connection.execute).to.be.calledOnce;
      expect(connection.execute).to.be.calledWith('SELECT * FROM products WHERE id = ?;', [1]);
      expect(result).to.be.equal(findAllProduct[0]);
    });

    it('retorna uma mesagem de erro quando o produto não é encontrado', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await productModel.getProductById(1000);

      expect(connection.execute).to.be.calledOnce;
      expect(connection.execute).to.be.calledWith('SELECT * FROM products WHERE id = ?;', [1000]);
      expect(result).to.be.equal(undefined);
    });
  });
});
