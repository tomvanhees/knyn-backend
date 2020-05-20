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

                            <transition-group name="component-fade" mode="out-in" class="d-flex flex-wrap">
                                <dl-product-index-card :key="product.id" :product="product" v-for="product in FilteredProducts"></dl-product-index-card>
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
                            <div class="form-check" :key="category.id" v-for="category in Categories">
                                <input type="checkbox" :value="category.id" v-model="selected_categories" :id="`category_${category.id}`" class="form-check-input">
                                <label :for="`category_${category.id}`" class="form-check-label">{{category.name}}</label>
                            </div>
                        </div>

                        <div class="card-header">
                            <div class="card-header-text">
                                Merken
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="form-check">
                                <input type="checkbox" :value="0" v-model="selected_brands" :id="`brand_0`" class="form-check-input">
                                <label :for="`brand_0`" class="form-check-label">Geen merk</label>
                            </div>

                            <div class="form-check" :key="brand.id" v-for="brand in Brands">
                                <input type="checkbox" :value="brand.id" v-model="selected_brands" :id="`brand_${brand.id}`" class="form-check-input">
                                <label :for="`brand_${brand.id}`" class="form-check-label">{{brand.name}}</label>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http/http";
    import ProductIndexCard from "../../components/Products/ProductIndexCard";
    import {CategoryMixin} from "../../mixins/CategoryMixin";
    import {BrandMixin} from "../../mixins/BrandMixin";

    export default {
        name      : "Products",
        components: {
            "dl-product-index-card": ProductIndexCard
        },
        mixins    : [
            CategoryMixin,
            BrandMixin
        ],
        data() {
            return {
                products           : [],
                selected_brands    : [],
                selected_categories: [],
            }
        },

        computed: {
            FilteredProducts() {
                if (this.selected_brands.length !== 0 && this.selected_categories.length !== 0) {
                    return this.products.filter(product => {

                        if (this.selected_brands.includes(product.brand.id) && product.categories.some(category => this.selected_categories.includes(category.id))) {
                            return product;
                        }
                    })

                }

                if (this.selected_brands.length !== 0) {
                    return this.products.filter(product => {
                        if (this.selected_brands.includes(product.brand.id)) {
                            return product;
                        }
                    })
                }

                if (this.selected_categories.length !== 0) {
                    return this.products.filter(product => {
                        if (product.categories.some(category => this.selected_categories.includes(category.id))) {
                            return product;
                        }
                    });
                }

                return this.products
            }
        },
        methods : {
            getProducts() {
                http.get("/product").then(response => {
                    this.products = response.data;
                })
            }
        },
        created() {
            this.getProducts();

        }
    }
</script>

<style scoped>

</style>