import http from "../http/http";

export const CategoryMixin = {
    data(){
        return{
            categories: [],
        }
    },
    methods:{
        getCategories() {
            http.get("product/categories").then(response => {
                this.categories = response.data
            })
        },
    }
}