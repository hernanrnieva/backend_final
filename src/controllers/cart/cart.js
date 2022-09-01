import { sendError } from '../helpers/error.js'
import cartModel from '../../models/cart/cart.js'


/* Main methods */
const cartController = {
    createCart: async (req, res) => { 
        try {
            const email = req.session.passport.user.id
            const address = req.session.passport.user.address

            const cart = await cartModel.createCart(email, address)

            return res.json(cart)
        } catch(e) { return sendError(e, res, 400) }
    },
    addProductToLoggedCart: async (req, res) => {
        const pId = req.body.id
        const cId = req.session.passport.user.cartId

        try {
            let newCart = await cartModel.addProductToCart(pId, cId)

            return res.json(newCart)
        } catch(e) { return sendError(e, res, 500) }
    },
    addProductToCart: async (req, res) => {
        const pId = req.body.id
        const cId = req.params.id

        try {
            let newCart = await cartModel.addProductToCart(pId, cId)

            return res.json(newCart)
        } catch(e) { return sendError(e, res, 500) }
    },
    getProductsFromCart: async (req, res) => {
        try {
            let products = await cartModel.getProductsFromCart(req.params.id)
            
            return res.json(products)
        } catch(e) { return sendError(e, res, 500) }
    },
    buyCartById: async (req, res) => {
        const id = req.params.id
        try {
            const bought = await cartModel.buyCartById(id)

            return res.json({message: `Cart bought successfully`, cart: bought})
        } catch(e) { return sendError(e, res, 500) }
    },
    deleteProductFromCart: async (req, res) => {
        const cId = req.params.id
        const pId = req.body.id
        try {
            const updatedCart = await cartModel.deleteProductFromCart(pId, cId)

            return res.json(updatedCart)
        } catch(e) { return sendError(e, res, 500)}
    }
}

export default cartController