import daoFactory from '../../persistence/data/daos/factory/daoFactory.js'
import productModel from '../product/product.js'
import orderModel from '../order/order.js'
import { sendNewOrderMail } from '../mailer/mailer.js'
import cartHelpers from './helpers.js'

const cartDao = await daoFactory.getCartsPersistence()

const cartModel = {
    createCart: async (email, address) => {
        let newId = 1

        let existingCarts = await cartDao.getAll()
        if(existingCarts.length > 0)
            newId = existingCarts[existingCarts.length - 1].id + 1

        const cartData = {
            id: newId,
            email: email,
            date: new Date().toLocaleString(),
            address: address,
            products: []
        }

        const cart = await cartDao.save(cartData)

        return cartHelpers.generateCartDto(cart)
    },
    addProductToCart: async (pId, cId) => {
        const product = await productModel.getProductById(pId)
        if(!product)
            throw new Error(`Product with id ${pId} could not be found`)

        const cart = await cartDao.getById(cId)
        if(!cart)
            throw new Error(`Cart with id ${cId} could not be found`)

        /* Check if other instance of same product exists and change it if it does */
        const idx = cart.products.findIndex(pD => pD.product.id == pId)
        if(idx >= 0)
            cart.products[idx].quantity ++

        else
            cart.products.push({
                product: product,
                quantity: 1
            })

        await cartDao.updateById(cId, cart)

        return cartHelpers.generateCartDto(cart)
    },
    getProductsFromCart: async (id) => {
        const cart = await cartDao.getById(id)

        return cart.products
    },
    buyCartById: async (id) => {
        const cart = await cartDao.getById(id)

        if(cart.products.length == 0)
            throw new Error(`Cart with id ${id} cannot be bought since no products have been loaded`)

        sendNewOrderMail(cart)
        orderModel.receiveOrder(cart.email, cart.products)

        const oldCart = JSON.parse(JSON.stringify(cart))
        cart.products = []

        await cartDao.updateById(id, cart)

        return cartHelpers.generateCartDto(oldCart)
    },
    deleteProductFromCart: async (pId, cId) => {
        const cart = await cartDao.getById(cId)
        if(!cart)
            throw new Error(`Cart with id ${cId} could not be found`)

        const idx = cart.products.findIndex(pD => pD.product.id == pId)
        if(idx < 0)
            throw new Error(`Product with id ${pId} could not be found in cart with id ${cId}`)

        if(cart.products[idx].quantity == 1)
            cart.products.splice(idx, 1)

        else
            cart.products[idx].quantity --

        const updatedCart = await cartDao.updateById(cId, cart)

        return cartHelpers.generateCartDto(updatedCart)
    }
}

export default cartModel