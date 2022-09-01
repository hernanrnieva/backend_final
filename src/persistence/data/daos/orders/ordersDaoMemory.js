import ContainerMemory from '../../../storage/memory/memory.js'

class OrderDaoMemory extends ContainerMemory {
    constructor(){
        super()
    }
}

export default new OrderDaoMemory()