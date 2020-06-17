<template>
    <div>
        <h1>Producten</h1>

        <div class="container">
            <div class="row">
                <div class="col-9 ">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-center my-3">
                                <router-link :to="`/products/create`">
                                    <div class="large-add-button">
                                        <span>+</span>
                                    </div>
                                </router-link>
                            </div>

                            <transition-group
                                    class="d-flex flex-wrap"
                                    mode="out-in"
                                    name="component-fade"
                            >
                                <dl-product-index-card
                                        v-for="product in FilteredProducts"
                                        :key="product.id"
                                        :product="product"
                                />
                            </transition-group>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <!--                    <div class="input-group">-->
                    <!--                        <input type="text" class="form-control">-->
                    <!--                        <div class="input-group-append">-->
                    <!--                            <button class="btn btn-outline-primary">Zoeken (wip)</button>-->
                    <!--                        </div>-->
                    <!--                    </div>-->


                    <div class="card">
                        <div class="card-header">
                            <span class="card-header-text">Categorieën</span>
                        </div>
                        <div class="card-body">
                            <div
                                    v-for="category in Categories"
                                    :key="category.id"
                                    class="form-check"
                            >
                                <input
                                        :id="`category_${category.id}`"
                                        v-model="selectedCategories"
                                        :value="category.id"
                                        class="form-check-input"
                                        type="checkbox"
                                >
                                <label
                                        :for="`category_${category.id}`"
                                        class="form-check-label"
                                >{{ category.name }}</label>
                            </div>
                        </div>

                        <div class="card-header">
                            <div class="card-header-text">
                                Merken
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="form-check">
                                <input
                                        :id="`brand_0`"
                                        v-model="selectedBrands"
                                        :value="0"
                                        class="form-check-input"
                                        type="checkbox"
                                >
                                <label
                                        :for="`brand_0`"
                                        class="form-check-label"
                                >Geen merk</label>
                            </div>

                            <div
                                    v-for="brand in Brands"
                                    :key="brand.id"
                                    class="form-check"
                            >
                                <input
                                        :id="`brand_${brand.id}`"
                                        v-model="selectedBrands"
                                        :value="brand.id"
                                        class="form-check-input"
                                        type="checkbox"
                                >
                                <label
                                        :for="`brand_${brand.id}`"
                                        class="form-check-label"
                                >{{ brand.name }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Component, {mixins} from "vue-class-component";
    import ProductIndexCard from "@/components/Products/ProductIndexCard.vue";
    import {CategoryMixin} from "@/mixins/CategoryMixin";
    import {BrandMixin} from "@/mixins/BrandMixin";
    import {ProductInterface} from "@/classes/product/product.interface";
    import ProductModel from "@/classes/product/product.model";
import ProductService from "@/classes/product/product.service";
    @Component({
        components: {
            "dl-product-index-card": ProductIndexCard
        },
    })

    export default class Products extends mixins(CategoryMixin, BrandMixin) {
        selectedBrands: Array<number> = [];
        selectedCategories: Array<number> = []
        products: Array<ProductModel> = [];


        get Products(): Array<ProductInterface> {
            return this.products
        }

        get ABrandIsSelected(): boolean {
            if (typeof this.selectedBrands === "undefined") {
                return false;
            }

            return this.selectedBrands.length !== 0
        }

        get ACategoryIsSelected(): boolean {
            if (typeof this.selectedCategories === "undefined") {
                return false;
            }
            return this.selectedCategories.length !== 0;
        }

        get FilteredProducts(): Array<ProductInterface> {
            if (this.ABrandIsSelected && this.ACategoryIsSelected) {
                return this.Products.filter(product => {

                    if (this.selectedBrands.includes(product.brand.id) && product.categories.some(category => this.selectedCategories.includes(category.id))) {
                        return product;
                    }
                })

            }
            if (this.ABrandIsSelected) {
                return this.Products.filter(product => {
                    if (this.selectedBrands.includes(product.brand.id)) {
                        return product;
                    }
                })
            }

            if (this.ACategoryIsSelected) {
                return this.Products.filter(product => {
                    if (product.categories.some(category => this.selectedCategories.includes(category.id))) {
                        return product;
                    }
                });
            }

            return this.Products
        }

        created(): void {
           ProductService.fetch().then(response => {
               response.data.forEach((product: any) => this.products.push(new ProductModel().deserialize(product)))
           })
        }
    }
</script>

<style scoped>

</style>
