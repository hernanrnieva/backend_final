import { mongourl } from '../../../../controllers/config/config.js'
import ContainerMongoDB from '../../../storage/mongo/mongo.js'
import productModel from '../../../storage/mongo/models/product.js'
const URL = mongourl

class ProductDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, productModel)
    }
}

export default new ProductDaoMongoDB()