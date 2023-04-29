const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { ProductController } = require("../../../src/controllers");
const { ProductService } = require("../../../src/services");
const findAllProduct = require("../mock/findAllProduct.mock");
const mockNewProduct = require("../mock/newProduct.mock");
const {
  validatedProductName,
} = require("../../../src/middlewares/validatedProduct");

describe("Testa o controller do product", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("Testa o controller findAll", () => {
    it("retorna todos os produtos", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(ProductService, "findAllProducts").resolves(findAllProduct);

      await ProductController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(findAllProduct);
    });
  });

  describe("Testa o controller findById", () => {
    it("retorna um produto pelo id", async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const next = sinon.stub();

      sinon.stub(ProductService, "findProductById").resolves(findAllProduct[0]);

      await ProductController.findById(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(findAllProduct[0]);
      expect(next).to.not.be.called;
    });

    it("retorna uma mesagem de erro quando o produto não é encontrado", async () => {
      const req = {
        params: {
          id: 4,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const next = sinon.stub();

      sinon.stub(ProductService, "findProductById").resolves(undefined);

      await ProductController.findById(req, res, next);

      expect(next).to.be.calledWith({
        status: 404,
        message: "Product not found",
      });
    });

    describe("Testa o controller insert", () => {
      it("insere um novo produto", async () => {
        const req = {
          body: {
            name: mockNewProduct.name,
          },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };

        sinon.stub(ProductService, "createProduct").resolves(mockNewProduct.id);

        await ProductController.insert(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(mockNewProduct);
      });

      it("retorna uma mensagem de erro quando o nome do produto é inválido", async () => {
        const req = {
          body: {},
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };

        await validatedProductName(req, res);
        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({
          message: '"name" is required',
        });
      });

      it("retorna uma mensagem de erro quando o nome do produto é menor que 5 caracteres", async () => {
        const req = {
          body: {
            name: "x",
          },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };

        await validatedProductName(req, res);
        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({
          message: '"name" length must be at least 5 characters long',
        });
      });
    });
  });
});
