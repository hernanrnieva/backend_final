import daoFactory from '../../persistence/data/daos/factory/daoFactory.js'

const orderDao = await daoFactory.getOrdersPersistence()

const orderModel = {
    receiveOrder: async (email, products,) => {
        const orders = await orderDao.getAll()

        const id = orders.length == 0? 1 : orders.length

        const newOrder = {
            id: id,
            email: email,
            items: products,
            state: 'generated',
            timestamp: new Date().toLocaleString()
        }

        const saved = await orderDao.save(newOrder)

        return saved
    }
}

export default orderModel