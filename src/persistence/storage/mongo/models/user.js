import mongoose from 'mongoose'

const schemaUser = new mongoose.Schema({
    name: {type: String, require: true},
    id: {type: String, require: true, max: 100},
    password: {type: String, require: true},
    address: {type: String, require: true},
    cartId: {type: Number, require: true}
}, {versionKey: false})

export default mongoose.model('users', schemaUser)