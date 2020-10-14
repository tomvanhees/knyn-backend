<template>
  <div>
    <view-title :title="ProductTitle">
      <div v-if="hasProduct" />
    </view-title>

    <div class="card">
      <div class="d-flex justify-space-between">
        <div class="card-title">
          Productgegevens
        </div>
        <div class="d-flex">
          <div class="mt-15 mr-10">
            <edit-brand />
          </div>
          <div class="mt-15 mr-15">
            <edit-category />
          </div>
        </div>
      </div>


      <div class="card-body">
        <div class="product-data-grid">
          <div>
            <div class="form-group">
              <label for="">Naam *</label>
              <input
                v-model="product.name"
                class="form-control"
                type="text"
              >
            </div>
            <div class="form-group">
              <label for="">Prijs *</label>
              <input
                v-model="product.price"
                class="form-control"
                type="text"
              >
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Merk *</label>
              <label
                for="brand"
                class="select-wrapper"
              >
                <select
                  id="brand"
                  v-model="product.brand"
                  class="form-control"
                >
                  <option
                    v-for="(brand) in brands"
                    :key="`brand_${brand.id}`"
                    :value="brand"
                  >
                    {{ brand.name }}
                  </option>
                </select>
              </label>
            </div>

            <div class="form-group">
              <label for="">Categorie *</label>
              <label
                class="select-wrapper form-control"
              >
                <div class="">
                  <div
                    class="d-flex categories-main"
                    @click.prevent="toggleShowCategories"
                  >
                    <div
                      v-for="category in product.categories"
                      :key="`display_category_${category.id}`"
                      class="badge"
                      @click.prevent.stop="removeCategory(category)"
                    >
                      <div class="pr-10">
                        {{ category.name }}
                      </div>

                      <div class="close">x</div>
                    </div>
                  </div>
                  <div class="show-categories-container">
                    <div
                      v-show="showCategories"
                      class="product-menu-list-container form-control"
                      style="position: absolute"
                    >
                      <div>
                        <ul class="product-menu-list">
                          <li
                            v-for="(category) in categories"
                            :key="`category_${category.id}`"
                            class="product-menu-list-item mt-5"
                          >
                            <input
                              :id="`category_${category.id}`"
                              v-model="product.categories"
                              :value="category"
                              type="checkbox"
                            >

                            <label :for="`category_${category.id}`">
                              {{ category.name }}

                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <div class="form-group">
              <label for="">Omschrijving</label>
              <textarea
                id=""
                v-model="product.description"
                class="form-control"
                name=""
              />
            </div>
          </div>
        </div>
        <button
          class="btn btn-primary"
          @click="saveProduct"
        >
          <angle-right-button-icon :text="hasProduct ? 'Aanpassen' : 'Aanmaken'" />
        </button>
      </div>
    </div>

    <div class="card mt-25">
      <div class="card-title">
        Afbeeldingen toevoegen
      </div>
      <div class="card-body">
        <div>
          <image-upload
            :is-active="hasProduct"
            :upload-text="FileUploadLines"
            :upload-to="`/product/${product.id}/media`"
            @addMediaFile="addMediaFile"
          />
        </div>
      </div>
    </div>

    <div class="card mt-25">
      <div class="card-title">
        Afbeeldingen
      </div>
      <div class="card-body">
        <div>
          <image-gallery :images="product.media" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ViewTitle from '@/components/layout/ViewTitle.vue'
import ImageUpload from '@/components/Images/ImageUpload.vue'

import ProductModel from '@/classes/product/product.model'
import ProductService from '@/classes/product/product.service'
import ImageGallery from '@/components/Images/ImageGallery.vue'
import EditBrand from '@/components/Products/EditBrand'
import EditCategory from '@/components/Products/EditCategory'
import AngleRightButtonIcon from '@/components/layout/AngleRightButtonIcon'
// import { MessagesService } from '@/classes/MessagesService'

export default {
  name: 'Edit',
  components: {
    ViewTitle,
    ImageUpload,
    ImageGallery,
    EditBrand,
    EditCategory,
    AngleRightButtonIcon
  },
  data () {
    return {
      product: {},
      showCategories: false
    }
  },
  computed: {
    brands () {
      return this.$store.getters['brands/getBrands']
    },
    categories () {
      return this.$store.getters['categories/getCategories']
    },
    hasProduct () {
      return this.product.id !== 0
    },
    ProductTitle () {
      return this.hasProduct ? this.product.name : 'Product toevoegen'
    },
    ProductHasNoMedia () {
      return this.product.media.length === 0
    },
    FileUploadLines () {
      if (!this.hasProduct) {
        return 'Er moet eerst een product aangemaak worden voordat je afbeeldingen kunt toevoegen.'
      }

      return 'Sleep de bestanden naar hier of klik om bestanden toe te voegen'
    },
  },
  created () {
    this.product = new ProductModel()

    if (this.$route.params.id === undefined) {
      return
    }
    ProductService
        .find(this.$route.params.id)
        .then((product) => this.product = new ProductModel().deserialize(product.data['content']))
  },
  methods: {
    addMediaFile (mediaFile) {
      this.product.media.push(mediaFile)
    },
    saveProduct () {
      if (this.hasProduct) {
        this.updateProduct()
        return
      }
      this.createProduct()
    },
    createProduct () {

      ProductService
          .create(this.product)
          .then(response => {
            this.product = new ProductModel().deserialize(response.data['content'])
          })

    // <!--.-->
      // catch(errors)
      // {
      //   //   MessagesService.throwErrorMessages(errors)
      //   // }
      //
      }
    ,
      updateProduct()
      {
        ProductService.update(this.product)
      }
    ,
      toggleShowCategories()
      {
        this.showCategories = !this.showCategories
      }
    ,
      removeCategory(category)
      {
        const index = this.product.categories.findIndex(iteration => iteration.id === category.id)
        this.product.categories.splice(index, 1)
      }
    ,

      deleteProduct()
      {
        ProductService.delete(this.product).then(() => {
          this.$router.push('/products')
        })
      }
    ,
    }
  }
</script>
