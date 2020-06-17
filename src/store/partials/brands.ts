import {BrandInterface} from "@/classes/brand/brand.interface";
import BrandService from "@/classes/brand/brand.service";
import {AxiosResponse} from "axios";
import {BrandModel} from "@/classes/brand/brand.model";

export const brands = {
    namespaced: true,
    state: {
        brands: Array<BrandInterface>()
    },
    mutations: {
        setBrands(state: any, brands: Array<BrandInterface>) {
          brands.forEach(brand => state.brands. push(new BrandModel().deserialize(brand)))
        },
        addBrand(state: any, brand: BrandInterface) {
            state.brands.push(new BrandModel().deserialize(brand))
        },
        deleteBrand(state: any, value: BrandInterface) {
            const index = state.brands.indexOf(value);
            state.brands.splice(index, 1);
        }
    },
    actions: {
        getBrands: ({state,commit}: any) => {
            if (state.brands.length === 0){
                BrandService.fetch()
                    .then((response: AxiosResponse) => {
                        commit("setBrands", response.data)
                    })
            }
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
