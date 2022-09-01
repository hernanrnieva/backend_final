import CartDto from '../../persistence/data/dtos/cartDto.js'

const cartHelpers = {
    generateCartDto: (c) => {
        return new CartDto(c)
    },
    generateCartDtos: (carts) => {
        return carts.map(c => { return new CartDto(c)})
    }
}

export default cartHelpers