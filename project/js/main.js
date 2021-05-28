const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        addProductURl:'/addToBasket.json',
        basketUrl:'/getBasket.json',
        products: [],
        filtered:[],
        basket:[],
        imgCatalog: 'http://placehold.it/200x150',
        userSearch: '',
        show: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(item) {
            let seach = this.basket.find(el=>el.id_product === item.id_product)
            if(seach){
                seach.quantity++;
            }else{
                const basketProd = new Object.assing({quantity:1},item);
                this.basket.push(basketProd);
            }
        },
        remove(item){
            let seach = this.basket.find(el=>el.id_product === item.id_product)
            if(item.quantity>1){
                item.quantity--;
            }else{
                this.basket.splice(this.basket.indexOf(seach),1);
            }
        },
        filter(){
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(item=>regexp.test(item.product_name));
            console.log(userSearch);
        },
     },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            });
          this.getJson(`${API + this.basketUrl}`) 
            .then(data=>{
                for(let item of data.contents){
                    this.basket.push(item);

                }
            });
        
    }
});

   