const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { SaleController } = require("../../../src/controllers");
const { SaleService } = require("../../../src/services");
const {
  mockAllSales,
  mockSaveResultSale,
  mockTemplateSale,
} = require("../mock/salesMock.mock");

describe("Testa o controller do sale", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("Testa o controller findAll", () => {
    it("retorna todos os sales", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(SaleService, "getAllSales").resolves(mockAllSales);

      await SaleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockAllSales);
    });
  });

  describe("Testa o controller findById", () => {
    it("retorna um sale pelo id", async () => {
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

      sinon.stub(SaleService, "getSaleById").resolves(mockAllSales[0]);

      await SaleController.findById(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockAllSales[0]);
      expect(next).to.not.be.called;
    });

    it("retorna uma mesagem de erro quando o sale não é encontrado", async () => {
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

      sinon.stub(SaleService, "getSaleById").resolves(undefined);

      await SaleController.findById(req, res, next);

      expect(next).to.be.calledWith({
        status: 404,
        message: "Sale not found",
      });
    });
  });

  describe("Testa o controller create", () => {
    it("retorna um novo sale", async () => {
      const req = {
        body: mockTemplateSale,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };

      sinon.stub(SaleService, "createSale").resolves(4);

      await SaleController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockSaveResultSale);
    });
  });
});
