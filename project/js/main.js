const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.getJson()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    getJson() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
            //            block.innerHTML += productObj.render();
        }

    }
    calculSum() {
        let sum = 0;
        return this.allProducts.forEach((item) => {
            sum += item.price;

        })

    }

}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;

    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn"
                data-id="${this.id}"
                data-name="${this.title}"
                data-price="${this.price}">Купить</button>
            </div>`

    }
}

class Basket {
    constructor(container = '.list_basket') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.getJson()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render()
                this.init()
            })
    }
    getJson() {
        return fetch(`${API}/getBasket.json `)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        const basket = document.querySelector(this.container);
        for (let product of this.goods) {
            let basketProduct = new BasketElem(product);
            this.allProducts.push(basketProduct);
            basket.insertAdjacentHTML('afterbegin', basketProduct.render());
        }
    }
    init() {
        document.querySelector('.products').addEventListener('click', event => {
            if (event.target.classList.contains('buy-btn')) {
                console.log(event.target);
                this.addProduct(event.target);
            }
        });
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.classList.contains('del-btn')) {
                console.log(event.target);
                this.removeProduct(event.target);
            }
        })

    }
    addProduct(element) {
        let productId = +element.dataset['id'];
        let find = this.allProducts.find(product => product.id === productId);
        if (find) {
            find.quantity = find.quantity + 1;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +element.dataset['price'],
                product_name: element.dataset['name'],
                quantity: 1
            };
            this.goods = [product];
            this.render();
        }
    }
    removeProduct(element) {
        let productId = +element.dataset['id'];
        let find = this.allProducts.find(product => product.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
        } else {
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.basket_elem[data-id="${productId}"]`).remove();
        }
    }
    _updateCart(product) {
        let block = document.querySelector(`.basket_elem[data-id="${product.id}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `$${product.quantity * product.price}`;

    }
}




class BasketElem {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = product.quantity;

    }
    render() {
        return `<div class="basket_elem" data-id="${this.id}">
        <div class="desc_list">
            <h3>${this.title}</h3>
            <p class ="product-quantity">Quantity:${this.quantity} </p>
        </div>
        <div class="right-block">
            <p class="product-price">$${this.quantity * this.price}</p>
            <button class="del-btn" data-id="${this.id}">&times;</button>
        </div>
    </div>`
    }

}

document.querySelector('.btn-cart').addEventListener('click', () => {
    if (document.querySelector('.list_basket').style.display = "none") {
        document.querySelector('.list_basket').style.display = "block";
    }
});



let list = new ProductsList();
let list2 = new Basket();













