const products = [
    { ud: 1, title: 'Notebook', price: 2000, img: 'img/img_moving.jpg' },
    { ud: 2, title: 'Mouse', price: 20, img: 'img/img_moving.jpg' },
    { ud: 3, title: 'Keyboard', price: 200, img: 'img/img_moving.jpg' },
    { ud: 4, title: 'Gamepad', price: 50, img: 'img/img_moving.jpg' },
]

class ProductsList {
    constructor(container = '.products') {
        this.container = container
        this.goods = []
        this.allProducts = []
        this._fetchProducts()
    }

    _fetchProducts() {
        this.goods = [
            { ud: 1, title: 'Notebook', price: 2000, img: 'img/img_moving.jpg' },
            { ud: 2, title: 'Mouse', price: 20, img: 'img/img_moving.jpg' },
            { ud: 3, title: 'Keyboard', price: 200, img: 'img/img_moving.jpg' },
            { ud: 4, title: 'Gamepad', price: 50, img: 'img/img_moving.jpg' },
        ]
    }

    render() {
        const block = document.querySelector(this.container)
        for (let product of this.goods) {
            const productObject = new ProductItem(product)
            this.allProducts.push(productObject)
                // block.innerHTML += productObject.render()
            block.insertAdjacentHTML('beforeend', productObject.render())
        }
    }

    totalListSum() {
        return this.goods.reduce(function(total, item) {
            return total + item.price
        }, 0)
    }

}

class ProductItem {
    constructor(product) {
        this.title = product.title
        this.price = product.price
        this.id = product.id
        this.img = product.img
    }
    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}

class Cart {
    constructor() {}
    render() {}
    addItem() {}
    removeItem() {}
    cartSum() {}
}

class CartItem {
    constructor() {}
    render() {}
}

let list = new ProductsList()
list.render()
console.log(list._totalListSum())