<template>
  <div>
    <div
      class="header-button"
      @click="toggleShow"
    >
      <div class="title-button-container">
        <div class="title-text">
          Bewerk Categorieën
        </div>
        <div class="title-button">
          <span><font-awesome-icon icon="plus" /></span>
        </div>
      </div>
    </div>
    <div v-if="showCard">
      <div class="cover" />
      <div class="card floating-card">
        <div class="card-title">
          Categorieën bewerken
        </div>
        <div class="card-body">
          <div class="form-group">
            <div class="list-container">
              <ul class="list-group">
                <li
                  v-for="category in $store.getters['categories/getCategories']"
                  :key="category.id"
                  class="list-group-item d-flex justify-space-between mb-5"
                >
                  <div>{{ category.name }}</div>
                  <div>
                    <button
                      class="btn btn-sm btn-danger"
                      title="verwijderen"
                      @click="deleteCategory(category)"
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
                v-model="category.name"
                type="text"
                class="form-control"
              >
              <div class="input-group-append">
                <button
                  class="input-group-button btn btn-primary"
                  @click="createCategory"
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
import { CategoryModel } from '@/classes/category/category.model'

export default {
  name: 'AddCategoryButton',
  components: {
    AngleRightButtonIcon
  },
  data () {
    return {
      showCard: false,
      category: {},
    }
  },
  created () {
    this.clearCategory()
  },
  methods: {
    toggleShow () {
      this.showCard = !this.showCard
    },
    clearCategory () {
      this.category = new CategoryModel()
    },
    async createCategory () {
      if (this.category.name === '' || this.category.name.length === 0) return
      await this.$store.dispatch('categories/addCategory', this.category)
      this.clearCategory()
    },
    async deleteCategory (category) {
      if (confirm('Ben je zeker dat je deze categorie wilt verwijderen?')) {
        await this.$store.dispatch('categories/deleteCategory', category)
      }
    }
  }
}
</script>
