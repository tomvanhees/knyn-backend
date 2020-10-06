<template>
  <div>
    <transition
      mode="out-in"
      name="component-fade"
    >
      <div class="yippo-container">
        <router-view />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Product',
  created () {
    this.$store.dispatch('brands/getBrands')
    this.$store.dispatch('categories/getCategories')
  }
}
</script>

<style scoped>

</style>
