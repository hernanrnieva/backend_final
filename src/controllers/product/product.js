import productModel from '../../models/product/product.js'
import { sendError } from '../helpers/error.js'

/* Main methods */
const productController = {
    getProducts: async (req, res) => {
        try {
            const products = await productModel.getProducts()

            return res.render('layouts/home', {products: products})
        } catch(e) { return sendError(e.message, res, 500) }
    },
    getProductById: async (req, res) => {
        try {
            let product = await productModel.getProductById(req.params.id)

            return res.json(product)
        } catch(e) { return sendError(`Element with id ${req.params.id} could not be found`, res, 404) }
    },
    getProductsByCategory: async (req, res) => {
        try {
            const category = req.params.category.toLowerCase()
            const products = await productModel.getProductsByCategory(category)

            return res.render('layouts/home', {products: products})
        } catch(e) { return sendError(`Error encountered filtering by category ${req.params.category}: ${e.message}`, res, 404) }
    },
    createProduct: async (req, res) => {
        try {
            let newProduct = await productModel.createProduct(req.body)

            return res.json(newProduct)
        } catch(e) { return sendError(e, res, 500) }
    },
    updateProductById: async (req, res) => {
        try {
            let newProduct = await productModel.updateProductById(req.body, req.params.id)
            
            return res.json(newProduct)
        } catch(e) { return sendError(`Error trying to update product with id ${req.params.id}: ${e}`, res, 500) }
    },
    deleteProductById: async (req, res) => {
        try {
            const deleted = await productModel.deleteProductById(req.params.id)
            
            return res.json(deleted)
        } catch(e) { return sendError(`Error trying to delete product with id ${req.params.id}: ${e}`, res, 500) }
    }
}

export default productController