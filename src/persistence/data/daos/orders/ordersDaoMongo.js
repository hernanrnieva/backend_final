import { mongourl } from '../../../../controllers/config/config.js'
import ContainerMongoDB from '../../../storage/mongo/mongo.js'
import orderModel from '../../../storage/mongo/models/order.js'
const URL = mongourl

class OrderDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, orderModel)
    }
}

export default new OrderDaoMongoDB()