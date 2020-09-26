<template>
  <div>
    <h1>Product toevoegen</h1>

    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div
                    class="d-flex justify-content-center"
                    @dragover.prevent
                    @drop="onImageDrop"
                  >
                    <label
                      class="large-add-button"
                      for="images"
                    >
                      <span class="">+</span>
                      <input
                        id="images"
                        ref="images"
                        multiple
                        style="position: absolute; opacity: 0"
                        type="file"
                        @change="onImageChange"
                      >

                      <div class="loading" />
                    </label>
                  </div>
                </div>

                <div class="col-8">
                  (Voorbeeld van de afbeeldingen WIP)
                </div>
                <div class="col-4" />
              </div>
            </div>

            <div class="card-body">
              <div>
                <div class="form-group">
                  <label for="">Naam</label>
                  <input
                    v-model="product.name"
                    class="form-control"
                    type="text"
                  >
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

                <div class="form-group">
                  <label for="">Prijs</label>
                  <input
                    v-model="product.price"
                    class="form-control"
                    type="text"
                  >
                </div>
              </div>
            </div>

            <div class="card-body">
              <button
                class="btn btn-outline-primary"
                @click="addProduct"
              >
                Aanmaken
              </button>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-header">
              <div class="card-header-text">
                Categorie
              </div>
            </div>
            <div class="card-body">
              <div class="mb-2">
                <div
                  v-for="category in Categories"
                  :key="category.id"
                  class="form-check"
                >
                  <input
                    :id="`category_${category.id}`"
                    v-model="product.categories"
                    :value="category"
                    class="form-check-input"
                    type="checkbox"
                  >
                  <label
                    :for="`category_${category.id}`"
                    class="form-check-label"
                  >{{ category.name }}</label>
                </div>
              </div>
              <edit-categories />
            </div>


            <div class="card-header">
              <div class="card-header-text">
                Merk
              </div>
            </div>
            <div class="card-body">
              <div class="mb-2">
                <div
                  v-for="brand in Brands"
                  :key="brand.id"
                  class="form-check"
                >
                  <input
                    :id="`brand_${brand.id}`"
                    v-model="product.brand_id"
                    :value="brand.id"
                    class="form-check-input"
                    type="radio"
                  >
                  <label
                    :for="`brand_${brand.id}`"
                    class="form-check-label"
                  >{{ brand.name }}</label>
                </div>
              </div>


              <edit-brands />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Component, {mixins} from "vue-class-component";

    import http from "@/http/http";
    import {CategoryMixin} from "@/mixins/CategoryMixin";
    import {BrandMixin} from "@/mixins/BrandMixin";

    import EditBrands from "@/views/Products/Brands/EditBrands.vue";
    import EditCategories from "@/views/Products/Categories/EditCategories.vue";

    import {BrandInterface} from "@/classes/brand/brand.interface";
    import {CategoryInterface} from "@/classes/category/category.interface";
    import ProductModel from "@/classes/product/product.model";
    import {UploadMediaClass, UploadMediaInterface} from "@/classes/UploadMedia.class";

    @Component({
        components: {
            EditBrands,
            EditCategories
        },
    })
    export default class Create extends mixins(CategoryMixin, BrandMixin) {
        product: ProductModel = new ProductModel();
        images: Array<string> = []
        brands: Array<BrandInterface> = []
        categories: Array<CategoryInterface> = []
        upload = {
            status: 0,
            currentUpload: 1 as number
        }
        uploadMedia: UploadMediaInterface = new UploadMediaClass()

        get ProductHasImages(): boolean {
            return this.images.length > 0
        }

        addProduct() {
            http.post("/product", this.product)
                .then((response) => {

                    if (this.ProductHasImages) {
                        // this.uploadImages(response.data.product.id)
                    }

                    this.$router.push("/products");
                })
        }

        uploadImage() {
            this.$store.dispatch("product/uploadMedia", this.uploadMedia);
        }

        onImageDrop(event: any) {
            this.uploadMedia.onDroppedEvent(event)
        }

        onImageChange(event: any) {
            this.uploadMedia.onChangeEvent(event)
        }
    }
</script>

<style scoped>

</style>
