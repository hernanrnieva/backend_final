export default class ProductDto {

    constructor(product) {
        this.id = product.id
        this.description = product.description
        this.price = product.price
        this.thumbnail = product.thumbnail
        this.category = product.category
    }
}