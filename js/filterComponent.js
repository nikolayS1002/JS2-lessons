Vue.component('filter', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
                <form action="#" class="search-form" @submit.prevent='$parent.filter(userSearch)'>
                    <input type="text" class="search-field" v-model="userSearch">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
            `
})