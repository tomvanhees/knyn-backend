<template>
  <router-link
    :to="`products/${product.id}`"
    as="div"
    class="product-card"
  >
    <div class="card-body">
      <div class="image-container">
        <img
          :src="product.cover"
          alt=""
        >
      </div>
      <div class="mt-25">
        <div class="name">
          {{ product.name }}
        </div>
        <div class="brand">
          {{ product.brand.name }}
        </div>
        <div class="price">
          {{ product.price }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
