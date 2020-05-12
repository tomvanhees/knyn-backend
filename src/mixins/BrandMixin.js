export const BrandMixin = {
    computed: {
        Brands() {
            return this.$store.state.brands.brands
        },
    }
}