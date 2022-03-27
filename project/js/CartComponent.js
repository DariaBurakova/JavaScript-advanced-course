Vue.component('cart', {
    props: ['basket', 'visibility'],
    template: `
        <div class="cart-block" v-show="visibility">
            <list_basket v-for="item of basket" :key="item.id_product"  :list_basket="item">
            </list_basket>
        </div>
    `
});

Vue.component('list_basket', {
    props: ['list_basket'],
    template: `
    <div class="list_basket">
                        <div class="desc-list">
                            <div class="product-title">{{list_basket.product_name }}</div>
                            <div class="product-quantity">Quantity: {{list_basket.quantity }}</div>
                            <div class="product-single-price">$ {{ list_basket.price }}</div>
                        </div>
                    <div class="right-block">
                        <div class="product-price">{{list_basket.quantity*list_basket.price}}</div>
                        <button class="del-btn" @click="$root.remove(list_basket)">&times;</button>
                    </div>
                </div>
    `
})