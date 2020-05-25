<template>
    <div>
        <h1>{{product.name}}</h1>


        <div class="container">
            <div class="row">
                <div class="col-8">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 mt-1 mb-4">
                                    <div @dragover.prevent @drop="onImageDrop" class="d-flex justify-content-center">
                                        <label class="large-add-button" for="images">
                                            <span class="">+</span>
                                            <input @change="onImageChange" id="images" multiple ref="images" style="position: absolute; opacity: 0" type="file">
                                            <div :style="ProgressbarProgression" class="loading"></div>
                                        </label>
                                    </div>
                                </div>

                                <div class="col-8">
                                    <div class="mb-3">
                                        <div class="position-relative">
                                            <img :src="ActiveImage" alt="" class="mw-100 rounded">
                                            <div class="position-absolute" style="top:0; right: 0" v-show="!ProductHasNoMedia">
                                                <button @click="removeImage" class="btn btn-sm btn-outline-delete"><span>x</span></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-4">
                                    <div class="d-flex flex-wrap mw-100">
                                        <div :key="index" class="mr-1" v-for="(image,index) in product.media">
                                            <thumb :active_image="active_image" :image="image" :index="index" :key="index" v-on:set_active="setActiveImage"></thumb>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="form-group">
                                <label for="">Naam</label>
                                <input class="form-control" type="text" v-model="product.name">
                            </div>
                            <div class="form-group">
                                <label for="">Omschrijving</label>
                                <textarea class="form-control" id="" name="" v-model="product.description"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="">Prijs</label>
                                <input class="form-control" type="text" v-model="product.price">
                            </div>
                            <div class="form-group d-flex justify-content-between">
                                <button @click="updateProduct" class="btn btn-outline-primary">Aanpassen</button>
                                <button @click="deleteProduct" class="btn btn-outline-danger">Verwijderen</button>
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
                                <div :key="category.id" class="form-check" v-for="category in Categories">
                                    <input :id="`category_${category.id}`" :value="category" class="form-check-input" type="checkbox" v-model="product.categories">
                                    <label :for="`category_${category.id}`" class="form-check-label">{{category.name}}</label>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="card-title font-weight-bold">
                                Merk
                            </div>
                            <div class="mb-2">
                                <div :key="brand.id" class="form-check" v-for="brand in Brands">
                                    <input :id="`brand_${brand.id}`" :value="brand" class="form-check-input" type="radio" v-model="product.brand">
                                    <label :for="`brand_${brand.id}`" class="form-check-label">{{brand.name}}</label>
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
    import Vue from "vue";

    import http from "@/http/http";
    import {CategoryMixin} from "@/mixins/CategoryMixin";
    import {BrandMixin} from "@/mixins/BrandMixin";
    import {UploadStatusMixin} from "@/mixins/UploadStatusMixin";
    import thumb from "@/components/Products/Thumb.vue"
    import {ProductInterface} from "@/interfaces/ProductInterface";

    export default Vue.extend({
                                  name: "Show", components: {
            thumb
        }, mixins                     : [CategoryMixin, BrandMixin, UploadStatusMixin], data() {
            return {
                product: {} as ProductInterface, active_image: 0
            }
        }, computed                   : {
            ProductHasNoMedia(): boolean {
                return this.product.media.length === 0;
            }, ActiveImage(): string {
                if (this.ProductHasNoMedia) {
                    return "";
                }

                return this.product.media[this.active_image].display
            }
        }, methods                    : {
            getProduct() {
                http.get(`/product/${this.$route.params.id}`).then(response => {
                    this.product = response.data;
                })
            }, updateProduct() {
                http.post(`/product/${this.product.id}`, {
                    "name": this.product.name, "description": this.product.description, "price": this.product.price, "brand_id": this.product.brand.id, "categories": this.product.categories, "_method": "PATCH"
                }).then(() => {

                })
            }, deleteProduct() {
                http.post(`/product/${this.product.id}`, {
                    "_method": "DELETE"
                }).then(() => {
                    this.$router.push("/products")
                })
            }, setActiveImage(value: number) {
                this.active_image = value
            }, async uploadImage(image: any) {
                const formData = new FormData;
                formData.append(`image`, image)
                formData.append("_method", "PATCH");

                return await http.post(`/product/${this.product.id}/media`, formData)
                                 .then((response) => {
                                     this.product.media.push(response.data);
                                 });

            }, removeImage() {
                http.post(`/product/${this.product.id}/media/${this.product.media[this.active_image].id}`, {
                    "_method": "DELETE"
                }).then(() => {
                    this.product.media.splice(this.active_image, 1);

                    if (this.ProductHasNoMedia || this.active_image === 0) {
                        this.active_image = 0
                    } else {
                        this.active_image--;
                    }
                })
            },
        }, created() {
            this.getProduct();
        }
                              })
</script>

<style lang="scss" scoped>
</style>