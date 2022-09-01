import mongoose from 'mongoose'

const schemaOrder = new mongoose.Schema({
    id: {type: Number, require: true, max: 100},
    email: {type: String, require: true, max: 100},
    timestamp: {type: String, require: true, max: 200},
    state: {type: String, require: true, max: 200},
    items: {type: Array, require: true, max: 200}
}, {versionKey: false})

export default mongoose.model('orders', schemaOrder)