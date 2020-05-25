import {CategoryInterface} from "@/interfaces/CategoryInterface";

export const CategoryMixin = {
    computed:{
        Categories(): Array<CategoryInterface>{
          return this.$store.state.categories.categories;
        },
    }
}