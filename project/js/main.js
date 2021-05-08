class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
            //            block.innerHTML += productObj.render();
        }
    }
    //Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
    calculSum() {
        let sum = 0;
        this.goods.forEach((item) => {
            sum += item.price;

        })
        console.log(sum);

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;

    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}
// Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
class Basket {
    constructor() {
        this.addGoods = [];
        this.removeGoods = [];
    }
    addGoods() {

    }
    removeGoods() {

    }
}
class BasketElem {
    constructor(title, price, id, img = 'https://via.placeholder.com/200x150') {
        this.title = title;
        this.price = price;
        this.id = id;
        this.img = img;

    }
}


let list = new ProductsList();
list.render();











