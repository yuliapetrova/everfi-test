import express from 'express';
import productService from '../services/products.service';

class ProductsMiddleware {
    private static instance: ProductsMiddleware;

    static getInstance() {
        if (!ProductsMiddleware.instance) {
            ProductsMiddleware.instance = new ProductsMiddleware();
        }
        return ProductsMiddleware.instance;
    }

    async validateRequiredProductBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.name && req.body.code && req.body.price) {
            next();
        } else {
            res.status(400).send({error: `Missing required fields name, code and price`});
        }
    }

    async validateSameNameDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const product = await productService.getProductByName(req.body.name);
        if (product) {
            res.status(400).send({error: `Product with this name is already exists`});
        } else {
            next();
        }
    }
}

export default ProductsMiddleware.getInstance();
