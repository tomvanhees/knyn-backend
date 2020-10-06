<template>
  <div class="product-menu">
    <div class="product-menu-title">
      Categorieën
    </div>
    <div class="product-menu-list-container">
      <ul class="product-menu-list">
        <li
          v-for="(category,index) in categories"
          :key="`category_${index}`"
          class="product-menu-list-item"
        >
          <input
            :id="`category_${index}`"
            v-model="selectedCategories"
            type="checkbox"
            :value="category"
            @change="emitSelectedCategories"
          >
          <label :for="`category_${index}`">
            {{ category.name }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CategoryService from '@/classes/category/category.service'

export default {
  name: 'CategoriesMenu',
  data () {
    return {
      selectedCategories: []
    }
  },
  computed: {
    categories () {
      return this.$store.getters['categories/getCategories']
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    emitSelectedCategories () {
      this.$emit('selected', this.selectedCategories)
    },
    async fetchCategories () {
      const respons = await CategoryService.fetch()
      this.categories = CategoryService.deserialize(respons)
    },
  }
}
</script>

<style scoped>

</style>
