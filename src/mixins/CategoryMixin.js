export const CategoryMixin = {
    computed:{
        Categories(){
          return this.$store.state.categories.categories;
        },
    }
}