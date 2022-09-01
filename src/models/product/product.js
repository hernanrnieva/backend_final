import productHelpers from './helpers.js'
import daoFactory from '../../persistence/data/daos/factory/daoFactory.js'

const productDao = await daoFactory.getProductsPersistence()

const productModel = {
    getProducts: async () => {
        const products = await productDao.getAll()

        return products
    },
    getProductById: async (id) => {
        const product = await productDao.getById(id)

        const productF = productHelpers.generateProductDto(product)

        return productF
    },
    getProductsByCategory: async (category) => {
        const products = await productDao.getAll()

        const productsF = productHelpers.generateProductDtos(products)
        
        const filtered = productsF.filter(p => p.category.toLowerCase() == category)

        return filtered
    },
    createProduct: async (product) => {
        let newProduct = productHelpers.validateProduct(product)

        const products = await productDao.getAll()
        const newId = products.length == 0 ? 1 : products[products.length - 1].id + 1

        newProduct.id = newId

        newProduct = await productDao.save(newProduct)

        return productHelpers.generateProductDto(newProduct)
    },
    updateProductById: async (product, id) => {
        let newProduct = productHelpers.validateProduct(product)

        newProduct["id"] = parseInt(id)
        newProduct = await productDao.updateById(id, newProduct)

        return productHelpers.generateProductDto(newProduct)
    },
    deleteProductById: async (id) => {
        const deleted = await productDao.deleteById(id)

        return productHelpers.generateProductDto(deleted)
    }
}

export default productModel