import dotenv from 'dotenv'
dotenv.config()

const mongourl = process.env.MONGOURL
const port = process.env.PORT
const usersPersistence = process.env.USERS_PERSISTENCE
const productsPersistence = process.env.PRODUCTS_PERSISTENCE
const messagesPersistence = process.env.MESSAGES_PERSISTENCE
const ordersPersistence = process.env.ORDERS_PERSISTENCE
const cartsPersistence = process.env.CARTS_PERSISTENCE
const mailerHost = process.env.MAILER_HOST
const mailerEmail = process.env.MAILER_EMAIL
const mailerPass = process.env.MAILER_PASS
const sessionSecret = process.env.SESSION_SECRET
const sessionMaxAge = process.env.SESSION_MAX_AGE
const jwtKey = process.env.JWT_KEY
const jwtExpiration = process.env.JWT_EXPIRATION

const configController = {
    sendConfigs: async (req, res) => {
        const configs = {
            mongourl: mongourl,
            port: port,
            usersPersistence: usersPersistence,
            productsPersistence: productsPersistence,
            messagesPersistence: messagesPersistence,
            ordersPersistence: ordersPersistence,
            cartsPersistence: cartsPersistence,
            mailerHost: mailerHost,
            mailerEmail: mailerEmail,
            mailerPass: mailerPass,
            sessionSecret: sessionSecret,
            sessionMaxAge: sessionMaxAge,
            jwtKey: jwtKey,
            jwtExpiration: jwtExpiration
        } 
        res.json(configs)
    }
}

export default configController

export {
    mongourl,
    port,
    usersPersistence,
    productsPersistence,
    messagesPersistence,
    ordersPersistence,
    cartsPersistence,
    mailerHost,
    mailerEmail,
    mailerPass,
    sessionSecret,
    sessionMaxAge,
    jwtKey,
    jwtExpiration
}