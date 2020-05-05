import http from "../http/http";

export const BrandMixin = {
    data() {
        return {
            brands: [],
        }
    },
    methods: {
        getBrands() {
            http.get("product/brands").then(response => {
                this.brands = response.data
            })
        },
    }
}