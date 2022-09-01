import ContainerMemory from '../../../storage/memory/memory.js'

class MessageDaoMemory extends ContainerMemory {
    constructor(){
        super()
    }
}

export default new MessageDaoMemory()