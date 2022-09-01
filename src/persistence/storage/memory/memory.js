export default class ContainerMemory {
    /* Constructor */
    constructor() {
        this.elements = []
    }

    /* Methods */
    async save(element) {
        this.elements.push(element)

        return element
    }

    async getById(id) {
        try {
            const idx = this.findElementIndex(id)

            return this.elements[idx]
        } catch(e) {
            throw new Error(e)
        }
    }
    
    async getAll() {
        return this.elements
    }

    async updateById(id, element) {
        try {
            const idx = this.findElementIndex(id)
            this.elements[idx] = element

            return element
        } catch(e) {
            throw new Error(e)
        }
    }

    async deleteById(id) {
        try {
            const idx = this.findElementIndex(id)
            const deleted = this.elements[idx]

            this.elements.splice(idx, 1)

            return deleted 
        } catch(e) {
            throw new Error(e)
        }
    }

    deleteAll() {
        this.elements = []
    }

    findElementIndex(id) {
        const idx = this.elements.findIndex(e => e.id == id)
        if(idx < 0)
            throw new Error(`Element with id ${id} could not be found`)

        return idx
    }
}