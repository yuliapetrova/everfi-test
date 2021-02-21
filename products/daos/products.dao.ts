import shortid from 'shortid';
import debug from 'debug';
import {ProductDto} from "../dto/products.model";
const log: debug.IDebugger = debug('app:in-memory-dao');

class ProductsDao {
    private static instance: ProductsDao;
    users: Array<ProductDto> = [];

    constructor() {
        log('Created new instance of ProductsDaoDao');
    }

    static getInstance(): ProductsDao {
        if (!ProductsDao.instance) {
            ProductsDao.instance = new ProductsDao();
        }
        return ProductsDao.instance;
    }
}

export default ProductsDao.getInstance();
