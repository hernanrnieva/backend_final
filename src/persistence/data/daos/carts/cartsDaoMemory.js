import ContainerMemory from '../../../storage/memory/memory.js'

class CartDaoMemory extends ContainerMemory {
    constructor(){
        super()
    }
}

export default new CartDaoMemory()