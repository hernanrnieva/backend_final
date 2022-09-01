import express from 'express'
const router = express.Router()
import productController from '../../controllers/product/product.js'
import jwt from '../../controllers/middlewares/jwt.js'
import isLoggedIn from '../../controllers/middlewares/logged.js'

router.get('/', isLoggedIn, jwt, productController.getProducts)

router.get('/:id', isLoggedIn, jwt, productController.getProductById)

router.get('/category/:category', isLoggedIn, jwt, productController.getProductsByCategory)

router.post('/', isLoggedIn, jwt, productController.createProduct)

router.put('/:id', isLoggedIn, jwt, productController.updateProductById)

router.delete('/:id', isLoggedIn, jwt, productController.deleteProductById)

export default router