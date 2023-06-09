const { ProductService } = require('../services');

class ProductController {
  static async findAll(req, res) {
    const products = await ProductService.findAllProducts();
    return res.status(200).json(products);
  }

  static async findById(req, res, next) {
    const { id } = req.params;
    const product = await ProductService.findProductById(id);
    if (!product) {
      return next({ status: 404, message: 'Product not found' });
    }
    return res.status(200).json(product);
  }

  static async insert(req, res) {
    const { name } = req.body;
    const product = await ProductService.createProduct(name);
    return res.status(201).json({ id: product, name });
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    const product = await ProductService.findProductById(id);

    if (!product) {
      return next({ status: 404, message: 'Product not found' });
    }

    await ProductService.updateProduct(id, name);
    return res.status(200).json({ id, name });
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    const product = await ProductService.findProductById(id);

    if (!id || !product) {
      return next({ status: 404, message: 'Product not found' });
    }

    await ProductService.deleteProduct(id);
    return res.status(204).end();
  }

  static async findByName(req, res) {
    const { q } = req.query;
    const products = await ProductService.findProductByName(q);
    return res.status(200).json(products);
  }
}

module.exports = ProductController;
