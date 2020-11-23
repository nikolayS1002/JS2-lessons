const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


class ProductsList {
    constructor(container = '.products') {
        this.container = container
        this.goods = [] // массив товаров из JSON
        this._getProducts()
            .then(data => {
                this.goods = [...data]
                this.render()
                    // console.log(this._totalListSum())
            })
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const block = document.querySelector(this.container)
        for (let product of this.goods) {
            const productObject = new ProductItem(product)
            block.insertAdjacentHTML('beforeend', productObject.render())
        }
    }

    _totalListSum() {
        return this.goods.reduce(function(total, item) {
            return total + item.price
        }, 0)
    }

}

class Cart {
    constructor(container = '.cart') {
        this.container = container
        this.goods = [] // массив товаров из JSON
        this._getProducts()
            .then(data => {
                this.goods = [...data.contents]
                this.render()
                console.log('Цена товаров в корзине: ' + this._totalCartSum())
            })
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const block = document.querySelector(this.container)
        for (let product of this.goods) {
            const productObject = new ProductItem(product)
                // this.allProducts.push(productObject)
            block.insertAdjacentHTML('beforeend', productObject.render())
        }
    }

    addItem() {}
    removeItem() {}

    _totalCartSum() {
        return this.goods.reduce(function(total, item) {
            return total + item.price
        }, 0)
    }

}

class ProductItem {
    constructor(product, img = 'img/img_moving.jpg') {
        this.title = product.product_name
        this.price = product.price
        this.id = product.id_product
        this.img = img
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



class CartItem {
    constructor() {}
    render() {}
}

let list = new ProductsList()
let myCart = new Cart()