<template>
  <div>
    <view-title title="Producten">
      <div>
        <create-new-button
          to="/products/create"
          text="Product aanmaken"
        />
      </div>
    </view-title>

    <div class="product-index-container">
      <div>
        <div class="card">
          <div class="card-body">
            <div>
              <categories-menu @selected="setSelectedCategories" />
            </div>

            <div>
              <brands-menu @selected="setSelectedBrands" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          v-if="HasProducts"
        >
          <div
            class="product-container"
          >
            <product-card
              v-for="product in FilteredProducts"
              :key="`product_${product.id}`"
              :product="product"
            />
          </div>

          <paginator
            :paginator-items="paginator"
            @change="fetchProducts($event)"
          />
        </div>
        <div v-else>
          <div class="card">
            <div class="card-body text-center">
              Er zijn geen producten gevonden
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ProductCard from '@/components/Products/ProductCard.vue'
import ProductService from '@/classes/product/product.service'
import CategoriesMenu from '@/components/Products/CategoriesMenu.vue'
import BrandsMenu from '@/components/Products/BrandsMenu.vue'

import CreateNewButton from '@/components/Buttons/CreateNewHeaderButton.vue'
import ViewTitle from '@/components/layout/ViewTitle.vue'
import Paginator from '@/components/Paginator.vue'

export default {
  'name': 'ProductIndex',
  components: {
    ProductCard,
    CreateNewButton,
    CategoriesMenu,
    BrandsMenu,
    ViewTitle,
    Paginator
  },
  data () {
    return {
      selectedBrands: [],
      selectedCategories: [],
      products: [],
      paginator: []
    }
  },
  computed: {
    FilteredProducts () {
      return this.products
    },
    HasProducts () {
      return this.FilteredProducts.length !== 0
    },
  },
  created () {
    this.update()
    this.$store.dispatch('brands/getBrands')
    this.$store.dispatch('categories/getCategories')
  },
  methods: {
    setSelectedBrands (event) {
      this.selectedBrands = event
      this.update()
    },
    setSelectedCategories (event) {
      this.selectedCategories = event
      this.update()
    },
    update () {
      this.fetchProducts(1)
    },
    async fetchProducts (page = 1) {
      const response = await ProductService.fetch(page, this.selectedBrands, this.selectedCategories)

      this.paginator = response.data.meta
      this.products = await ProductService.deserialize(response)
    }
  }

}
</script>
