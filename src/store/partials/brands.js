import http from "../../http/http";

export const brands = {
    namespaced: true,
    state     : {
        brands: []
    },
    mutations : {
        setBrands(state, value) {
            state.brands = value
        },
        addBrand(state, value) {
            state.brands.push(value)
        },
        deleteBrand(state, value) {
            const index = state.brands.indexOf(value);
            state.brands.splice(index, 1);
        }
    },
    actions   : {
        getBrands  : ({commit}) => {
            http.get("product/brands").then(response => {
                commit("setBrands", response.data)
            })
        },
        addBrand   : ({commit}, value) => {
            commit("addBrand", value)
        },
        deleteBrand: ({commit}, brand) => {
            http.post(`product/brands/${brand.id}`, {
                "_method": "DELETE"
            }).then(() => {
                commit("deleteBrand", brand)
            })
        }
    }
}