import daoFactory from '../../persistence/data/daos/factory/daoFactory.js'
const messageDao = await daoFactory.getMessagesPersistence()
import { sendError } from '../helpers/error.js'
import messageModel from '../../models/message/message.js'

const messageController = {
    sendMessages: async (socket) => {
        const data = await messageDao.getAll()
        if(!data) 
            return

        const formattedMessages = data.map(d => {
            delete d["_id"]
            return d
        })

        socket.emit('message', formattedMessages)
    },
    createMessage: async (message, socket, sockets) => {
        message["date"] = new Date().toLocaleString()
        message["type"] = 'user'

        try { 
            await messageDao.save(message)
            
            const messages = await messageDao.getAll()
            
            socket.emit('message', messages)
            sockets.emit('message', messages)
        } catch(e) {
            logError(e)
        }
    },
    getFilteredMessages: async (req, res) => {
        try {
            const messages = await messageDao.getAll()

            const filtered = messages.filter(m => m.email == req.params.email)

            const filteredDtos = messageModel.generateMessageDtos(filtered)

            return res.render('layouts/chat-filtered', {messages: filteredDtos})
        } catch(e) {
            return sendError(`Error encountered filtering by type ${req.params.category}: ${e.message}`, res, 404)
        }
    },
    answerMessage: async (req, res) => {

        const requestor = req.body.email
        try {
            const messages = await messageDao.getAll()

            const filtered = messages.filter(m => m.email == requestor)

            if(filtered.length == 0)
                return sendError(`No previous messages have been received from ${requestor}`, res, 400)

            const newMessage = {
                text: req.body.text,
                email: requestor,
                type: 'admin',
                date: new Date().toLocaleString()
            }

            await messageDao.save(newMessage)

            res.json(newMessage)
        } catch(e) {
            throw new Error(e)
        }
    }
}

export default messageController