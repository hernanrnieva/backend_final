import { mongourl } from '../../../../controllers/config/config.js'
import ContainerMongoDB from '../../../storage/mongo/mongo.js'
import userModel from '../../../storage/mongo/models/cart.js'
const URL = mongourl

class CartDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, userModel)
    }
}

export default new CartDaoMongoDB()