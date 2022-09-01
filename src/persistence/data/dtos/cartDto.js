export default class CartDto {

    constructor(cart) {
        this.id = cart.id
        this.email = cart.email
        this.date = cart.date
        this.address = cart.address
        this.products = cart.products
    }
}