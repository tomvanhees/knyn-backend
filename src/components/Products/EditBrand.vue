<template>
  <div>
    <div>
      <div
        class="create-button"
        @click="toggleShow"
      >
        <div class="title-button-container">
          <div class="title-text">
            Bewerk Merken
          </div>
          <div class="title-button">
            <span><font-awesome-icon icon="plus" /></span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCard">
      <div class="cover" />
      <div class="card floating-card">
        <div class="card-title">
          Merken bewerken
        </div>
        <div class="card-body">
          <div class="form-group">
            <div class="list-container">
              <ul class="list-group">
                <li
                  v-for="brand in $store.getters['brands/getBrands']"
                  :key="brand.id"
                  class="list-group-item d-flex justify-space-between mb-5"
                >
                  <div>{{ brand.name }}</div>
                  <div>
                    <button
                      class="btn btn-sm btn-danger"
                      title="verwijderen"
                      @click="deleteBrand(brand)"
                    >
                      <span><font-awesome-icon icon="trash" /></span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                v-model="brand.name"
                type="text"
                class="form-control"
              >
              <div class="input-group-append">
                <button
                  class="input-group-button btn btn-primary"
                  @click="createBrand"
                >
                  Toevoegen
                </button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <button
              class="btn btn-primary"
              @click="toggleShow"
            >
              <angle-right-button-icon text="Sluiten" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AngleRightButtonIcon from '@/components/layout/AngleRightButtonIcon'
import { BrandModel } from '@/classes/brand/brand.model'

export default {
  name: 'AddBrandButton',
  components: {
    AngleRightButtonIcon
  },
  data () {
    return {
      showCard: false,
      brand: {}
    }
  },
  created () {
    this.clearBrand()
  },
  methods: {
    toggleShow () {
      this.showCard = !this.showCard
    },
    clearBrand () {
      this.brand = new BrandModel()
    },
    async createBrand () {
      if (this.brand.name === '' || this.brand.name.length === 0) return
      await this.$store.dispatch('brands/addBrand', this.brand)
      this.clearBrand()
    },
    async deleteBrand (brand) {
      if (confirm('Ben je zeker dat je dit merk wilt verwijderen?')) {
        await this.$store.dispatch('brands/deleteBrand', brand)
      }
    }
  }
}
</script>
