<template>
  <div class="product-index-card m-2">
    <router-link
      :to="`/products/${product.id}/${product.slug}`"
      style="text-decoration: none"
    >
      <div class="d-flex">
        <div>
          <img
            :src="product.cover"
            class="m-3"
            alt=""
            style="border-radius: 50%; width: 100px; height: 100px"
          >
        </div>


        <div class="card-body d-flex flex-column">
          <div>
            <div class="product-title">
              {{ product.name }}
            </div>
            <div class="product-brand">
              {{ product.brand.name }}
            </div>
          </div>
          <div class="product-price">
            {{ product.price }}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component, {mixins} from "vue-class-component";

    const ProductIndexCardProps = Vue.extend({
        props: {
            product: {
                type: Object,
                required: true
            }
        }
    })

    @Component
    export default class ProductIndexCard extends mixins(ProductIndexCardProps) {
    }
</script>

<style scoped>

</style>
