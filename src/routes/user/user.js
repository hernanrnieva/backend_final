/* Imports */
import express from 'express'
import passport from '../../controllers/user/passport/passport.js'
import userController from '../../controllers/user/users.js'
import isLoggedInR from '../../controllers/middlewares/registerLogged.js'
import isLoggedIn from '../../controllers/middlewares/logged.js'
import jwt from '../../controllers/middlewares/jwt.js'

const userRouter = express.Router()

/* Router */
userRouter.get('/', isLoggedInR, userController.register)

userRouter.post('/', isLoggedInR, passport.authenticate('register', {
    failureRedirect: '/register-fail',
    // successRedirect: '/products'
    successRedirect: '/getJwt'
}))

userRouter.get('/getJwt', userController.getJwt)

userRouter.get('/register-fail', userController.registerFail)

userRouter.get('/login', isLoggedInR, userController.login)

userRouter.post('/login', isLoggedInR, passport.authenticate('login', {
    failureRedirect: '/login-fail',
    // successRedirect: '/products'
    successRedirect: '/getJwt'
}))

userRouter.get('/login-fail', userController.loginFail)

userRouter.get('/logout', isLoggedIn, jwt, userController.logout)

export default userRouter