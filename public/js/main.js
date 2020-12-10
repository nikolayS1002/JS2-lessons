const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
    el: "#app",
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
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