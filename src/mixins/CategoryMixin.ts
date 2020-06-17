import Vue from "vue";
import Component from "vue-class-component";
import {CategoryInterface} from "@/classes/category/category.interface";

@Component
export class CategoryMixin extends Vue {
    get Categories(): Array<CategoryInterface> {
        return this.$store.state.categories.categories;
    }
}
