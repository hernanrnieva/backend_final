import messageController from '../../controllers/message/message.js'

const messageSocket = {
    sendMessages: async (socket) => {
        messageController.sendMessages(socket)
    },
    createMessage: async (message, socket, sockets) => {
        messageController.createMessage(message, socket, sockets)
    }
}

export default messageSocket