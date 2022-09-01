import express from 'express'
const router = express.Router()
import cartController from '../../controllers/cart/cart.js'
import isLoggedIn from '../../controllers/middlewares/logged.js'
import jwt from '../../controllers/middlewares/jwt.js'

/* Routes */
router.post('/', isLoggedIn, jwt, cartController.createCart)

router.post('/products', isLoggedIn, jwt, cartController.addProductToLoggedCart)

router.post('/:id/products', isLoggedIn, jwt, cartController.addProductToCart)

router.get('/:id/products', isLoggedIn, jwt, cartController.getProductsFromCart)

router.post('/:id', isLoggedIn, jwt, cartController.buyCartById)

router.delete('/:id/products/', isLoggedIn, jwt, cartController.deleteProductFromCart)

export default router