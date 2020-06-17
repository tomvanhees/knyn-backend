import Vue from "vue";
import Component from "vue-class-component";
import {BrandInterface} from "@/classes/brand/brand.interface";

@Component
export class BrandMixin extends Vue {
    get Brands(): Array<BrandInterface> {
        return this.$store.state.brands.brands
    }
}
