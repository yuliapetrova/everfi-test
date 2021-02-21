import ProductsDao from '../daos/products.dao';
import {CRUD} from "../../common/interfaces/crud.interface";
import {ProductDto} from "../dto/products.model";

class ProductsService implements CRUD {
    private static instance: ProductsService;

    static getInstance(): ProductsService {
        if (!ProductsService.instance) {
            ProductsService.instance = new ProductsService();
        }
        return ProductsService.instance;
    }

    async create(resource: ProductDto) {
        return await ProductsDao.addProduct(resource);
    }

    async deleteByName(name: string) {
        return await ProductsDao.removeProductByName(name);
    };

    async list(upperCase: string) {
        return await ProductsDao.getProducts(upperCase);
    };

    async getProductByName(name: string) {
        return ProductsDao.getProductByName(name);
    }
}

export default ProductsService.getInstance();
