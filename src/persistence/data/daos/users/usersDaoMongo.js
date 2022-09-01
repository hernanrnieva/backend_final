import { mongourl } from '../../../../controllers/config/config.js'
import ContainerMongoDB from '../../../storage/mongo/mongo.js'
import userModel from '../../../storage/mongo/models/user.js'
const URL = mongourl

class UserDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, userModel)
    }
}

export default new UserDaoMongoDB()