const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { SaleProductModel } = require("../../../src/models");
const connection = require("../../../src/db/connection");
const { mockAllSales, mockSaveResultSale } = require("../mock/salesMock.mock");

describe("Model: SaleProductModel", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("getAllSales", () => {
    it("retorna todos os sales", async () => {
      sinon.stub(connection, "execute").resolves([mockAllSales]);

      const result = await SaleProductModel.getAllSales();

      expect(connection.execute).to.be.calledOnce;
      expect(connection.execute).to.be.calledWith(
        `SELECT sale_id AS saleId, product_id as productId, quantity
      FROM sales_products;`
      );
      expect(result).to.be.equal(mockAllSales);
    });
  });

  describe("getSaleById", () => {
    it("retorna um sale pelo id", async () => {
      sinon.stub(connection, "execute").resolves([mockAllSales[0]]);

      const result = await SaleProductModel.getSaleById(1);

      expect(connection.execute).to.be.calledOnce;
      expect(connection.execute).to.be.calledWith(
        `SELECT sale_id AS saleId, product_id as productId, quantity
      FROM sales_products WHERE sale_id = ?;`,
        [1]
      );
      expect(result).to.be.equal(mockAllSales[0]);
    });

    it("retorna uma mesagem de erro quando o sale não é encontrado", async () => {
      sinon.stub(connection, "execute").resolves([]);

      const result = await SaleProductModel.getSaleById(1000);

      expect(connection.execute).to.be.calledOnce;
      expect(connection.execute).to.be.calledWith(
        `SELECT sale_id AS saleId, product_id as productId, quantity
      FROM sales_products WHERE sale_id = ?;`,
        [1000]
      );
      expect(result).to.be.equal(undefined);
    });
  });

  describe("createSale", () => {
    it("retorna o id do sale criado", async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);

      const result = await SaleProductModel.createProductSale(
        mockSaveResultSale
      );
      await SaleProductModel.createProductSale(mockSaveResultSale);

      expect(result).to.be.equal(4);
    });
  });
});
