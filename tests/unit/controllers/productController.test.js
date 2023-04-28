const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const findAllProduct = require('../mock/findAllProduct.mock');

describe('Testa o controller do product', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Testa o controller findAll', () => {
    it('retorna todos os produtos', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(productService, 'findAllProducts').resolves(findAllProduct);

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(findAllProduct);
    });
  });

  describe('Testa o controller findById', () => {
    it('retorna um produto pelo id', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(productService, 'findProductById').resolves(findAllProduct[0]);

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(findAllProduct[0]);
    });

    it('retorna uma mesagem de erro quando o produto não é encontrado', async () => {
      const req = {
        params: {
          id: 4,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(productService, 'findProductById').resolves(undefined);

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });
});
