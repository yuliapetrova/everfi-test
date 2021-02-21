import express from 'express';
import productService from '../services/products.service';
import debug from 'debug';
const log: debug.IDebugger = debug('app:products-controller');

class ProductsController {
    private static instance: ProductsController;

    // this will be a controller singleton (same pattern as before)
    static getInstance(): ProductsController {
        if (!ProductsController.instance) {
            ProductsController.instance = new ProductsController();
        }
        return ProductsController.instance;
    }

    async listProducts(req: express.Request, res: express.Response) {
        const products = await productService.list(req.params.upperCase = false);
        res.status(200).send(products);
    }

    async createProduct(req: express.Request, res: express.Response) {
        const userId = await productService.create(req.body);
        res.status(201).send({id: userId});
    }

    async removeProduct(req: express.Request, res: express.Response) {
        log(await productService.deleteByName(req.params.name));
        res.status(204).send(``);
    }
}

export default ProductsController.getInstance();
