import mongoose from 'mongoose'

const schemaProducts = new mongoose.Schema({
    id: {type: Number, require: true},
    description: {type: String, require: true, max: 100},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true, max: 2400},
    category: {type: String, require: true, max: 2400}
}, {versionKey: false})

export default mongoose.model('products', schemaProducts)