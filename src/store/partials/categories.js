import http from "../../http/http";

export const categories = {
    namespaced: true,
    state    : {
        categories: []
    },
    mutations: {
        setCategories(state, value) {
            state.categories = value
        }
    },
    actions  : {
        getCategories: ({commit}) => {
            http.get("product/categories").then(response => {
                commit("setCategories",  response.data)
            })
        }
    }
}