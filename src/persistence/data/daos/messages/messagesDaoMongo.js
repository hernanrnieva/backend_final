import { mongourl } from '../../../../controllers/config/config.js'
import ContainerMongoDB from '../../../storage/mongo/mongo.js'
import messageModel from '../../../storage/mongo/models/message.js'
const URL = mongourl

class MessageDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, messageModel)
    }
}

export default new MessageDaoMongoDB()