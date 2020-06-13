<template>
  <div>
    <h1>{{ product.name }}</h1>


    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12 mt-1 mb-4">
                  <div
                    class="d-flex justify-content-center"
                    @dragover.prevent
                    @drop="onMediaDrop"
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
                        @change="onMediaChange"
                      >
                      <div class="loading" />
                    </label>
                  </div>
                </div>

                <div class="col-8">
                  <div class="mb-3">
                    <div class="position-relative">
                      <img
                        :src="ActiveImage"
                        alt=""
                        class="mw-100 rounded"
                      >
                      <div
                        v-show="!ProductHasNoMedia"
                        class="position-absolute"
                        style="top:0; right: 0"
                      >
                        <button
                          class="btn btn-sm btn-outline-delete"
                          @click="removeImage"
                        >
                          <span>x</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex flex-wrap mw-100">
                    <div
                      v-for="(image,index) in product.media"
                      :key="index"
                      class="mr-1"
                    >
                      <thumb
                        :key="index"
                        :active_image="activeImage"
                        :image="image"
                        :index="index"
                        @set_active="setActiveImage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body">
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
              <div class="form-group d-flex justify-content-between">
                <button
                  class="btn btn-outline-primary"
                  @click="updateProduct"
                >
                  Aanpassen
                </button>
                <button
                  class="btn btn-outline-danger"
                  @click="deleteProduct"
                >
                  Verwijderen
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="card-title font-weight-bold">
                  Categorie
                </div>
              </div>

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
            </div>

            <div class="card-body">
              <div class="card-title font-weight-bold">
                Merk
              </div>
              <div class="mb-2">
                <div
                  v-for="brand in Brands"
                  :key="brand.id"
                  class="form-check"
                >
                  <input
                    :id="`brand_${brand.id}`"
                    v-model="product.brand"
                    :value="brand"
                    class="form-check-input"
                    type="radio"
                  >
                  <label
                    :for="`brand_${brand.id}`"
                    class="form-check-label"
                  >{{ brand.name }}</label>
                </div>
              </div>
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
    import thumb from "@/components/Products/Thumb.vue"
    import {ProductInterface} from "@/interfaces/ProductInterface";
    import {UploadMedia, UploadMediaInterface} from "@/classes/UploadMedia";
    import ProductClass from "@/classes/product.class";

    @Component
    export default class Show extends mixins(CategoryMixin, BrandMixin, thumb) {
        product: ProductInterface = new ProductClass()
        activeImage = 0
        uploadMedia: UploadMediaInterface = new UploadMedia();

        get ProductHasNoMedia(): boolean {
            return this.product.media.length === 0;
        }

        get ActiveImage(): string {
            if (this.ProductHasNoMedia) {
                return "";
            }
            return this.product.media[this.activeImage].display
        }

        created(): void {
            this.$store.dispatch("product/fetchProduct", this.$route.params.id)
                .then(() => {
                    this.product = new ProductClass()
                        .deserialize(this.$store.getters["product/getProduct"]);
                });
        }

        beforeDestroy(): void {
            this.$store.dispatch("product/clearProduct");
        }

        updateProduct(): void {
            this.$store.dispatch("product/updateProduct", this.product);
        }

        deleteProduct(): void {
            this.$store.dispatch("product/deleteProduct").then(() => {
                this.$router.push("/products")
            })
        }

        setActiveImage(value: number): void {
            this.activeImage = value
        }

        uploadImage(image: any) {
            const formData = new FormData;
            formData.append(`image`, image)
            formData.append("_method", "PATCH");

            return http.post(`/product/${this.product.id}/media`, formData)
                .then((response) => {
                    this.product.media.push(response.data);
                });
        }

        onMediaDrop(event: any): void {
            this.uploadMedia.onDroppedEvent(event)
        }

        onMediaChange(event: any): void {
            this.uploadMedia.onChangeEvent(event);
        }

        removeImage(): void {
            this.$store.dispatch("product/removeMedia", this.product.media[this.activeImage])
                .then(() => {
                    if (this.ProductHasNoMedia || this.activeImage === 0) {
                        this.activeImage = 0
                    } else {
                        this.activeImage--;
                    }
                })


        }
    }
</script>

<style lang="scss" scoped>
</style>
