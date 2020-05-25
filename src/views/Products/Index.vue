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
                  v-model="selected_categories"
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
                  v-model="selected_brands"
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
                  v-model="selected_brands"
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
    import Vue from 'vue';
    import http from "@/http/http";
    import ProductIndexCard from "@/components/Products/ProductIndexCard.vue";
    import {CategoryMixin} from "@/mixins/CategoryMixin";
    import {BrandMixin} from "@/mixins/BrandMixin";
    import {ProductInterface} from "@/interfaces/ProductInterface";

    export default Vue.extend({
                                  name: "Products", components: {
            "dl-product-index-card": ProductIndexCard
        }, mixins                     : [CategoryMixin, BrandMixin], data() {
            return {
                products: [] as Array<ProductInterface>, selected_brands: [] as Array<number>, selected_categories: [] as Array<number>,
            }
        }, computed                   : {
            FilteredProducts(): Array<ProductInterface> {
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
        }, created() {
            this.getProducts();

        }, methods                    : {
            getProducts() {
                http.get("/product").then(response => {
                    this.products = response.data;
                })
            }
        }
                              })
</script>

<style scoped>

</style>