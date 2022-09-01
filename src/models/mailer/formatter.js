export function getNewUserHtml(user) {
    return `<h1>User data:</h1>
            <h2><b>Email:</b> ${user.id}</h2>
            <h2><b>Address:</b> ${user.address}</h2>`
}

export function getNewOrderHtml(cart) {
    const fProducts = cart.products.map(p => {
        return `<h3>${p.quantity} X product ${p.product.id}:</h3>
                <img src="${p.product.thumbnail}" alt="Product with id ${p.product.id}" width="50px">
                <p>Description: ${p.product.description}</p>
                <p>Price: ${p.product.price}</p>
                <p>Category: ${p.product.category}</p>
                <p>Description: ${p.product.description}</p>
                `
    }).join(' ')

    return `<h1>Further data:</h1>
            <h2><b>Email:</b> ${cart.email}</h2>
            <h2><b>Address:</b> ${cart.address}</h2>
            <h2><b>Products:</b> ${fProducts}</h2>`
}
