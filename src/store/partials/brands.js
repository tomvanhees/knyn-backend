import http from "../../http/http";

export const brands = {
    namespaced: true,
    state    : {
        brands: []
    },
    mutations: {
        setBrands(state, value) {
            state.brands = value
        },
        addBrand(state, value) {
            state.brands.push(value)
        }
    },
    actions  : {
        getBrands: ({commit}) => {
            http.get("product/brands").then(response => {
                commit("setBrands",  response.data)
            })
        }
    }
}