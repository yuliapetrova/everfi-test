import {CommonRoutesConfig} from '../common/common.routes.config';
import ProductsController from './controllers/products.controller';
import ProductsMiddleware from './middleware/products.middleware';
import express from 'express';

export class ProductsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ProductsRoutes');
    }

    configureRoutes() {

        this.app.route(`/vegetable`)
            .get(ProductsController.listProducts)
            .post(
                ProductsMiddleware.validateRequiredProductBodyFields,
                ProductsMiddleware.validateSameNameDoesntExist,
                ProductsController.createProduct);

        this.app.param(`name`, ProductsMiddleware.extractProductName);
        this.app.route(`/vagetable/:name`)
            .all(ProductsMiddleware.validateProductExists)
            .delete(ProductsController.removeProduct);

        return this.app;
    }
}
