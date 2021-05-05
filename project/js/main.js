'use strict';
const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
const product = document.querySelector('.products');
//Функция для формирования верстки каждого товара
const renderProduct = (a, b) =>
    `<div class="product-item">
                <h3>${a}</h3>
                <p>${b}</p>
                <button class="buy-btn">Купить</button>
            </div>`

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price));
    console.log(productsList);
    product.innerHTML = productsList.join('');
};
renderPage(products);


