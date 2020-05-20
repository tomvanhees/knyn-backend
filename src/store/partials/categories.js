import http from "../../http/http";

export const categories = {
    namespaced: true,
    state    : {
        categories: []
    },
    mutations: {
        setCategories(state, value) {
            state.categories = value
        },
        addCategory(state, value) {
            state.categories.push(value)
        },
        deleteCategory(state,value){
            const index = state.categories.indexOf(value);
            state.categories.splice(index, 1);
        }
    },
    actions  : {
        getCategories: ({commit}) => {
            http.get("product/categories").then(response => {
                commit("setCategories",  response.data)
            })
        },
        addCategory   : ({commit}, value) => {
            http.post("/product/categories", {
                "name": value
            }).then(response => {
                commit("addCategory", response.data)

            })
        },
        deleteCategory:({commit}, category) => {
            http.post(`product/categories/${category.id}`, {
                "_method" : "DELETE"
            }).then(()=>{
                commit("deleteCategory", category)
            })
        }
    }
}