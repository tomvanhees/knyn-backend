import {BrandInterface} from "@/interfaces/BrandInterface";

export const BrandMixin = {
    computed: {
        Brands(): Array<BrandInterface> {
            return this.$store.state.brands.brands
        },
    }
}