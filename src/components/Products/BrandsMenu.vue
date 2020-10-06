<template>
  <div class="product-menu">
    <div class="product-menu-title">
      Merken
    </div>
    <div class="product-menu-list-container">
      <ul class="product-menu-list">
        <li
          v-for="(brand,index) in brands"
          :key="`brands_${index}`"
          class="product-menu-list-item"
        >
          <input
            :id="`brands_${index}`"
            v-model="selectedBrands"
            type="checkbox"
            :value="brand"
            @change="emitSelectedBrands"
          >
          <label :for="`brands_${index}`">
            {{ brand.name }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandsMenu',
  data () {
    return {
      selectedBrands: []
    }
  },
  computed: {
    brands () {
      return this.$store.getters['brands/getBrands']
    }
  },
  methods: {
    emitSelectedBrands () {
      this.$emit('selected', this.selectedBrands)
    }
  }
}
</script>

<style scoped>

</style>
