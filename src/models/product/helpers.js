import ProductDto from '../../persistence/data/dtos/productDto.js'

const PRODUCT_KEYS = 4

const productHelpers = {
    validateProduct: (product) => {
        let keys = Object.keys(product).length
        if(keys != PRODUCT_KEYS)
            throw 'Object does not have the correct amount of properties'

        if(!product.hasOwnProperty('description') ||
        !product.hasOwnProperty('price') ||
        !product.hasOwnProperty('thumbnail') ||
        !product.hasOwnProperty('category'))
            throw 'Object does not have the correct properties'

        return product
    },
    generateProductDto: (p) => {
        return new ProductDto(p)
    },
    generateProductDtos: (products) => {
        return products.map(p => { return new ProductDto(p)})
    }

}

export default productHelpers