Vue.component('search-form',{
template:`
        <form action="#" class="search-form" @submit.prevent="$root.filter">
                        <input type="text" class="search-field" v-model="$root.userSearch">
                        <button class="btn-search" type="submit">
                            <img src="img/search.svg" alt="">
                        </button>
                    </form>
`
});