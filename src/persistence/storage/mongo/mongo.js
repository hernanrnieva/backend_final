import mongoose from 'mongoose'
process.on('exit', () => {
    if(mongoose.connection.readyState == 1)
        mongoose.disconnect()
})

export default class ContainerMongoDB {
    /* Constructor */
    constructor(url, model) {
        this.url = url
        this.model = model
    }

    /* Heleper function for establishing connection */
    async connect() {
        try {
            if(mongoose.connection.readyState == 0) {
                await mongoose.connect(this.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            }
        } catch(e) {
            throw new Error(e)
        }
    }

    /* Methods */
    async save(element) {
        try {
            await this.connect()
            await this.model.create(element)

            return element
        } catch(e) { throw new Error(e) }
    }

    async getById(id) {
        try {
            await this.connect()
            const element = await this.model.findOne({id: id})

            if(!element)
                throw new Error(`Element with id ${id} not found`)
                
            return element
        } catch(e) { throw new Error(e) }
    }
    
    async getAll() {
        try {
            await this.connect()
            const elements = await this.model.find({}).lean()
            return elements
        } catch(e) { throw new Error(e) }
    }

    async updateById(id, element) {
        try {
            await this.connect()
            let newElement = await this.model.findOneAndUpdate({id: id}, element, {returnOriginal: false})

            return newElement
        } catch(e) { throw new Error(e) }
    }

    async deleteById(id) {
        try {
            await this.connect()
            const deleted = await this.getById(id)
            if(!deleted)
                throw new Error(`Element with id ${id} not found to be deleted`)
                
            let result = await this.model.deleteOne({id: id})

            if(result.deletedCount == 0)
                throw new Error(`Element with id ${id} could not be deleted`)
            
            return deleted
        } catch(e) { throw new Error(e) }
    }

    async deleteAll() {
        try {
            await this.connect()
            this.model.deleteMany()
        } catch(e) { throw new Error(e) }
    }
}