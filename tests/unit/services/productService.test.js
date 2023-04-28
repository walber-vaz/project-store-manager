const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const findAllProduct = require('../mock/findAllProduct.mock');
const { ProductModel } = require('../../../src/models');
const { ProductService } = require('../../../src/services');
const mockNewProduct = require('../mock/newProduct.mock');

describe('Testa o service do product', () => {
  afterEach(async () => {
    sinon.restore();
  });

  describe('Testa o service findAll', () => {
    it('retorna todos os produtos', async () => {
      sinon.stub(ProductModel, 'getAllProducts').resolves(findAllProduct);

      const result = await ProductService.findAllProducts();

      expect(ProductModel.getAllProducts).to.be.calledOnce;
      expect(ProductModel.getAllProducts).to.be.calledWith();
      expect(result).to.be.equal(findAllProduct);
    });
  });

  describe('Testa o service findById', () => {
    it('retorna um produto pelo id passado', async () => {
      sinon.stub(ProductModel, 'getProductById').resolves(findAllProduct[0]);

      const result = await ProductService.findProductById(1);

      expect(ProductModel.getProductById).to.be.calledOnce;
      expect(ProductModel.getProductById).to.be.calledWith(1);
      expect(result).to.be.equal(findAllProduct[0]);
    });

    it('retorna uma mesagem de erro quando o produto não é encontrado', async () => {
      sinon.stub(ProductModel, 'getProductById').resolves(undefined);

      const result = await ProductService.findProductById(1000);

      expect(ProductModel.getProductById).to.be.calledOnce;
      expect(ProductModel.getProductById).to.be.calledWith(1000);
      expect(result).to.be.equal(undefined);
    });
  });

  describe('Testa o service create', () => {
    it('cria um novo produto', async () => {
      sinon.stub(ProductModel, 'createProduct').resolves(mockNewProduct.id);

      const result = await ProductService.createProduct(mockNewProduct.name);

      expect(ProductModel.createProduct).to.be.calledOnce;
      expect(ProductModel.createProduct).to.be.calledWith(mockNewProduct.name);
      expect(result).to.be.eql(mockNewProduct.id);
    });
  });
});
