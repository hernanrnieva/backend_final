import express from 'express'
const mainRouter = express.Router()
import userRouter from './user/user.js'
import productRouter from './product/product.js'
import messageRouter from './message/message.js'
import cartRouter from './cart/cart.js'
import configRouter from './config/config.js'

mainRouter.use('/', userRouter)
mainRouter.use('/products', productRouter)
mainRouter.use('/chat', messageRouter)
mainRouter.use('/cart', cartRouter)
mainRouter.use('/config', configRouter)

mainRouter.use((req, res) => {
    res.json('Unexisting route')
})

export default mainRouter