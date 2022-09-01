import { 
    usersPersistence,
    productsPersistence,
    messagesPersistence,
    cartsPersistence,
    ordersPersistence
} from '../../../../controllers/config/config.js'

const data = {
    usersPersistence: usersPersistence? usersPersistence : 'memory',
    productsPersistence: productsPersistence? productsPersistence : 'memory',
    messagesPersistence: messagesPersistence? messagesPersistence : 'memory',
    cartsPersistence: cartsPersistence? cartsPersistence : 'memory',
    ordersPersistence: ordersPersistence? ordersPersistence : 'memory',
}

class DaoFactory {
    async getUsersPersistence() {
        if(data.usersPersistence == 'memory') {
            const usersDaoMemory = await import('../users/usersDaoMemory.js')
            return usersDaoMemory.default
        } 

        const usersDaoMongo = await import('../users/usersDaoMongo.js')
        return usersDaoMongo.default
    }

    async getProductsPersistence() {
        if(data.productsPersistence == 'memory') {
            const productsDaoMemory = await import('../products/productsDaoMemory.js')
            return productsDaoMemory.default
        } 

        const productsDaoMongo = await import('../products/productsDaoMongo.js')
        return productsDaoMongo.default
    }

    async getMessagesPersistence() {
        if(data.messagesPersistence == 'memory') {
            const messagesDaoMemory = await import('../messages/messagesDaoMemory.js')
            return messagesDaoMemory.default
        } 

        const messagesDaoMongo = await import('../messages/messagesDaoMongo.js')
        return messagesDaoMongo.default
    }

    async getCartsPersistence() {
        if(data.cartsPersistence == 'memory') {
            const cartsDaoMemory = await import('../carts/cartsDaoMemory.js')
            return cartsDaoMemory.default
        } 

        const cartsDaoMongo = await import('../carts/cartsDaoMongo.js')
        return cartsDaoMongo.default
    }

    async getOrdersPersistence() {
        if(data.ordersPersistence == 'memory') {
            const ordersDaoMemory = await import('../orders/ordersDaoMemory.js')
            return ordersDaoMemory.default
        } 

        const ordersDaoMongo = await import('../orders/ordersDaoMongo.js')
        return ordersDaoMongo.default
    }
}

const daoFactory = new DaoFactory()

export default daoFactory