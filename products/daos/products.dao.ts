import shortid from 'shortid';
import debug from 'debug';
import {ProductDto} from "../dto/products.model";
const log: debug.IDebugger = debug('app:in-memory-dao');

class ProductsDao {
    private static instance: ProductsDao;
    products: Array<ProductDto> = [];

    constructor() {
        log('Created new instance of ProductsDaoDao');
    }

    static getInstance(): ProductsDao {
        if (!ProductsDao.instance) {
            ProductsDao.instance = new ProductsDao();
        }
        return ProductsDao.instance;
    }

    async addProduct(product: ProductDto) {
        product.id = shortid.generate();
        this.products.push(product);
        return product.id;
    }

    async getProducts(upperCase: string) {
        if (upperCase==='true') {
            return this.products.map(function(x){
                return x.name.toUpperCase(); });
        } else {
            return this.products.map(function(x){
                return x.name; });
        }
    }

    async removeProductByName(name: string) {
        const objIndex = this.products.findIndex((obj: { id: string; }) => obj.id === name);
        this.products.splice(objIndex, 1);
        return `${name} removed`;
    }

    async getProductByName(name: string) {
        const objIndex = this.products.findIndex((obj: { name: string; }) => obj.name.toLowerCase() === name.toLowerCase());
        let currentProduct = this.products[objIndex];
        if (currentProduct) {
            return currentProduct;
        } else {
            return null;
        }
    }
}

export default ProductsDao.getInstance();
