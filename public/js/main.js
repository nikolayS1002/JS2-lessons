const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
    el: "#app",
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [1],
        filtered: [1],
        imgCart: 'img/img_moving.jpg',
        products: [],
        imgCatalog: 'img/img_moving.jpg',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => { console.log(error) })
        },
        postJson(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => { console.log(error) })
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => { console.log(error) })
        },
        delJson(url, data) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => { console.log(error) })
        },
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product)
            if (find) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item)
                this.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            this.getJson(`${API + '/addToBasket.json'}`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            find.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
        filter() {
            let regexp = new RegExp(this.uesrSearch, 'i')
            this.filtered = this.products.filter(el => regexp.test(el.product_name))
        },

        mounted() {
            this.getJson(`/api/cart`)
                .then(data => {
                    for (let item of data.contents) {
                        item.img = `img/${item.id_product}.jpg`
                        this.cartItems.push(item)
                    }
                })
            this.getJson(`/api/products`)
                .then(data => {
                    for (let item of data) {
                        item.img = `img/${item.id_product}.jpg`
                        this.filtered.push(item)
                        this.products.push(item)
                    }
                })
            this.getJson(`getProducts.json`)
                .then(data => {
                    for (let item of data) {
                        this.filtered.push(item)
                        this.products.push(item)
                    }
                })
        }
    }
})












// class List {
//     constructor(url, container, list = list2) {
//         this.container = container
//         this.list = list
//         this.url = url
//         this.goods = [] // массив товаров из JSON
//         this.allProducts = []
//         this.filtered = []
//         this._init() // регистрируем кнопку которая прописана в классе наследнике
//     }

//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     handleData(data) {
//         this.goods = [...data]
//         this.render()
//     }

//     render() {
//         const block = document.querySelector(this.container)
//         for (let product of this.goods) {
//             const productObject = new this.list[this.constructor.name](product)
//             this.allProducts.push(productObject)
//             block.insertAdjacentHTML('beforeend', productObject.render())
//         }
//     }

//     _totalListSum() {
//         return this.goods.reduce((total, item) => total = total + item.price, 0)
//     }

//     filter(value) {
//         const regexp = new RegExp(value, 'i')
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name))
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`)
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('invisible')
//             } else {
//                 block.classList.remove('invisible')
//             }
//         })
//     }

//     _init() {
//         return false
//     }
// }

// class Item {
//     constructor(product, img = 'img/img_moving.jpg') {
//         this.product_name = product.product_name
//         this.price = product.price
//         this.id_product = product.id_product
//         this.img = img
//     }

//     render() {
//         return `<div class="product-item" data-id="${this.id_product}">
//                 <img src="${this.img}" alt="">
//                     <div class="desc">   
//                         <h3>${this.product_name}</h3>
//                         <p>${this.price}</p>
//                         <button class="buy-btn"
//                         data-id="${this.id_product}"
//                         data-name="${this.product_name}"
//                         data-price="${this.price}">Купить</button>
//                     </div>
//                 </div>`
//     }
// }

// class ProductsList extends List {
//     constructor(cart, container = '.products', url = "/catalogData.json") {
//         super(url, container)
//         this.cart = cart
//         this.getJson()
//             .then(data => this.handleData(data)) // обрисовка каталога
//     }

//     _init() {
//         document.querySelector(this.container).addEventListener('click', el => {
//             if (el.target.classList.contains('buy-btn')) {
//                 this.cart.addProduct(el.target)
//             }
//         })
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault()
//             this.filter(document.querySelector('.search-field').value)
//         })
//     }
// }

// class Cart extends List {
//     // constructor(cart, container = '.products', url = "/catalogData.json") {
//     //     super(url, container)
//     //     this.cart = cart
//     //     this.getJson()
//     //         .then(data => this.handleData(data)) // обрисовка каталога
//     // }
//     constructor(container = '.cart-block', url = "/getBasket.json") {
//         super(url, container)
//         this.getJson()
//             .then(data => this.handleData(data.contents)) // отрисовка товаров корзины
//             // console.log('Цена товаров в корзине: ' + this._totalCartSum())
//     }
//     addProduct(element) {
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id']
//                     let find = this.allProducts.find(product => product.id_product === productId)
//                     if (find) {
//                         find.quantity++
//                             this._updateCart(find)
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         }
//                         this.goods = [product]
//                         this.render()
//                     }
//                 } else {
//                     alert('Error')
//                 }
//             })
//     }
//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id']
//                     let find = this.allProducts.find(product => product.id_product === productId)
//                     if (find.quantity > 1) {
//                         find.quantity--
//                             this._updateCart(find)
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1)
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//                     }
//                 } else {
//                     alert('Error')
//                 }
//             })
//     }
//     _updateCart(product) {
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`)
//         block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`
//         block.querySelector('.product-price').textContent = `Price: $${product.quantity*product.price}`
//     }
//     _init() {
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible')
//         })
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('del-btn')) {
//                 this.removeProduct(e.target)
//             }
//         })
//     }
// }

// class ProductItem extends Item {}

// class CartItem extends Item {
//     constructor(product, img = 'img/img_moving.jpg') {
//         super(product, img)
//         this.quantity = product.quantity
//     }
//     render() {
//         return `<div class="cart-item" data-id="${this.id_product}">
//                 <div class="product-bio">
//                     <img src="${this.img}" alt="image">
//                     <div class="product-desc">   
//                         <p class="product-title">${this.product_name}</p>
//                         <p class="product-quantity">Quantity: ${this.quantity}</p>
//                         <p class="product-single-price">$${this.price} each</p>
//                     </div>
//                 </div>
//                 <div class="right-block">
//                     <p class="product-price">$${this.quantity*this.price}</p>
//                     <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                 </div>
//                 </div>`
//     }
// }

// const list2 = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// }

// let myCart = new Cart()
// let products = new ProductsList(myCart)