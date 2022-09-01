import mongoose from 'mongoose'

const schemaMessage = new mongoose.Schema({
    email: {type: String, require: true},
    text: {type: String, require: true, max: 200},
    date: {type: String, require: true, max: 200},
    type: {type: String, require: true}
}, {versionKey: false})

export default mongoose.model('messages', schemaMessage)