import Vue from "vue";
import Component from "vue-class-component";
import {BrandInterface} from "@/interfaces/BrandInterface";

@Component
export class BrandMixin extends Vue {
    get Brands(): Array<BrandInterface> {
        return this.$store.state.brands.brands
    }
}
