import ContainerMemory from '../../../storage/memory/memory.js'

class UserDaoMemory extends ContainerMemory {
    constructor(){
        super()
    }
}

export default new UserDaoMemory()