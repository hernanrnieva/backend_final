import passport from 'passport'
import { Strategy } from 'passport-local'
const localStrategy = Strategy
import daoFactory from '../../../persistence/data/daos/factory/daoFactory.js'
import bcrypt from 'bcrypt'
import  { sendNewUserMail } from '../../../models/mailer/mailer.js'
import cartModel from '../../../models/cart/cart.js'

/* Bcrypt settings */
const saltRounds = 2

const userDao = await daoFactory.getUsersPersistence()

// Login
passport.use('login', new localStrategy({usernameField: 'email', passReqToCallback: true}, async function(req, username, password, done) {
    try {
        const exists = await userDao.getById(username)

        bcrypt.compare(password, exists.password, (err, result) => {
            if(!result)
                return done(null, false)
                
            return done(null, exists)
        })
    } catch(e) {
        return done(null, false)
    }
}))

// Register
passport.use('register', new localStrategy({usernameField: 'email', passReqToCallback: true}, async function(req, username, password, done) {
    try {
        await userDao.getById(username)

        return done(null, false)
    } catch(e) {
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            const userCart = await cartModel.createCart(username, req.body.address)
            const newUser = {
                name: req.body.name,
                id: username,
                password: hash,
                address: req.body.address,
                cartId: userCart.id
            }
            userDao.save(newUser).then(() => {
                sendNewUserMail(newUser)
                return done(null,newUser)
            }).catch((e) => { logError(e) })
        })
    }

}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async function(user, done) {
    const dsUser = userDao.getById(user.id)
    done(null, dsUser)
})

export default passport