import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

export class ProductsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ProductsRoutes');
    }

    configureRoutes() {
        this.app.route(`/vegetable`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`List of vegetables`);
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`Post to vegetables`);
            });

        this.app.route(`/vegetables/:name`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /products/:productId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested vegetable for name ${req.params.name}`);
            });

        return this.app;
    }
}
