
import http from "@/http/http";
import {BrandInterface} from "@/interfaces/BrandInterface";


export const brands = {
    namespaced: true,
    state     : {
        brands: Array<BrandInterface>()
    },
    mutations : {
        setBrands(state: any, value: Array<BrandInterface>) {
            state.brands = value
        },
        addBrand(state: any, value: BrandInterface) {
            state.brands.push(value)
        },
        deleteBrand(state: any, value: BrandInterface) {
            const index = state.brands.indexOf(value);
            state.brands.splice(index, 1);
        }
    },
    actions   : {
        getBrands  : ({commit}: any) => {
            http.get("product/brands").then(response => {
                commit("setBrands", response.data)
            })
        },
        addBrand   : ({commit}: any, name: string) => {
            http.post("/product/brands", {
                "name": name
            }).then(response => {
              commit("addBrand", response.data)

            })
        },
        deleteBrand: ({commit}: any, brand: BrandInterface) => {
            http.post(`product/brands/${brand.id}`, {
                "_method": "DELETE"
            }).then(() => {
                commit("deleteBrand", brand)
            })
        }
    }
}