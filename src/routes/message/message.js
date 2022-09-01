import express from 'express'
import messageController from '../../controllers/message/message.js'
const messagesRouter = express.Router()
import isLoggedIn from '../../controllers/middlewares/logged.js'
import jwt from '../../controllers/middlewares/jwt.js'

messagesRouter.get('/', isLoggedIn, (req, res) => {
    res.render('layouts/chat')
})

messagesRouter.get('/:email', isLoggedIn, jwt, messageController.getFilteredMessages)

messagesRouter.post('/', isLoggedIn, jwt, messageController.answerMessage)

export default messagesRouter