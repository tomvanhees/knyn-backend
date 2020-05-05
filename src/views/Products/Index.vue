<template>
    <div>
        <div class="container">
            <div class="row my-4">
                <div class="col-8">
                    <div>
                        <router-link tag="a" class="btn btn-dark" to="/products/create">Product toevoegen</router-link>
                    </div>
                </div>
                <div class="col-4">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control">
                            <div class="input-group-append">
                                <button class="btn btn-primary">Zoeken (wip)</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-8 d-flex flex-wrap">

                    <transition-group name="component-fade" mode="out-in" class="d-flex flex-wrap">
                        <dl-product-index-card :key="product.id" :product="product" v-for="product in FilteredProducts"></dl-product-index-card>
                    </transition-group>

                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-title font-weight-bold">Categorieën</div>
                            <div class="form-check" :key="category.id" v-for="category in categories">
                                <input type="checkbox" :value="category.id" v-model="selected_categories" :id="`category_${category.id}`" class="form-check-input">
                                <label :for="`category_${category.id}`" class="form-check-label">{{category.name}}</label>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="card-title font-weight-bold">Merken</div>
                            <div class="form-check" :key="brand.id" v-for="brand in brands">
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

    export default {
        name      : "Products",
        components: {
            "dl-product-index-card": ProductIndexCard
        },
        data() {
            return {
                brands    : [],
                categories: [],
                products  : [],


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
            getBrands() {
                http.get("product/brands").then(response => {
                    this.brands = response.data
                })
            },
            getCategories() {
                http.get("product/categories").then(response => {
                    this.categories = response.data
                })
            },
            getProducts() {
                http.get("/product").then(response => {
                    this.products = response.data;
                })
            }
        },
        created() {
            this.getBrands();
            this.getCategories();
            this.getProducts();

        }
    }
</script>

<style scoped>
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .2s;
    }

    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>