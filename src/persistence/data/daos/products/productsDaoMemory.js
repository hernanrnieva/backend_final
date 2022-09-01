import ContainerMemory from '../../../storage/memory/memory.js'

class ProductDaoMemory extends ContainerMemory {
    constructor(){
        super()
    }
}

export default new ProductDaoMemory()