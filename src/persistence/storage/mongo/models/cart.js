import mongoose from 'mongoose'

const schemaCart = new mongoose.Schema({
    id: {type: Number, require: true, max: 100},
    email: {type: String, require: true, max: 100},
    date: {type: String, require: true, max: 200},
    address: {type: String, require: true, max: 200},
    products: {type: Array, require: true, max: 200},
}, {versionKey: false})

export default mongoose.model('carts', schemaCart)