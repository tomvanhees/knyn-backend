import http from "@/http/http";
import {BrandInterface} from "@/interfaces/Brand.interface";
import BrandService from "@/classes/brand/brand.service";
import {AxiosResponse} from "axios";
import {BrandModel} from "@/classes/brand/brand.model";

export const brands = {
    namespaced: true,
    state: {
        brands: Array<BrandInterface>()
    },
    mutations: {
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
    actions: {
        getBrands: ({commit}: any) => {
            BrandService.fetch()
                .then((response: AxiosResponse) => {
                    commit("setBrands", response.data)
                })

        },
        addBrand: ({commit}: any, brand: BrandModel) => {
            BrandService.post(brand).then(response => {
                commit("addBrand", response.data)

            })
        },
        deleteBrand: ({commit}: any, brand: BrandModel) => {
            BrandService.delete(brand)
                .then(() => {
                        commit("deleteBrand", brand)
                    })
        }
    }
}
