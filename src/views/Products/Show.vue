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
                                    <div class="d-flex justify-content-center" @dragover.prevent @drop="onImageDrop">
                                        <label for="images" class="add-inspiration">
                                            <span class="">+</span>
                                            <input type="file" id="images" ref="images" style="position: absolute; opacity: 0" multiple @change="onImageChange">


                                            <div class="loading" :style="ProgressbarProgression"></div>
                                        </label>
                                    </div>
                                </div>

                                <div class="col-8">
                                    <div class="mb-3">
                                        <div class="position-relative">
                                            <img :src="ActiveImage" alt="" class="mw-100 rounded">
                                            <div class="position-absolute" style="top:0; right: 0" v-show="!ProductHasNoMedia">
                                                <button class="btn btn-sm btn-outline-delete" @click="removeImage"><span>x</span></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-4">
                                    <div class="d-flex flex-wrap mw-100">
                                        <div :key="index" v-for="(image,index) in product.media" class="mr-1">
                                            <thumb :key="index" :image="image" :index="index" :active_image="active_image" v-on:set_active="setActiveImage"></thumb>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="form-group">
                                <label for="">Naam</label>
                                <input type="text" class="form-control" v-model="product.name">
                            </div>
                            <div class="form-group">
                                <label for="">Omschrijving</label>
                                <textarea name="" id="" class="form-control" v-model="product.description"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="">Prijs</label>
                                <input type="text" class="form-control" v-model="product.price">
                            </div>
                            <div class="form-group d-flex justify-content-between">
                                <button class="btn btn-outline-primary" @click="updateProduct">Aanpassen</button>
                                <button class="btn btn-outline-danger" @click="deleteProduct">Verwijderen</button>
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
                                <div class="form-check" :key="category.id" v-for="category in Categories">
                                    <input type="checkbox" :value="category" v-model="product.categories" :id="`category_${category.id}`" class="form-check-input">
                                    <label :for="`category_${category.id}`" class="form-check-label">{{category.name}}</label>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="card-title font-weight-bold">
                                Merk
                            </div>
                            <div class="mb-2">
                                <div class="form-check" :key="brand.id" v-for="brand in Brands">
                                    <input type="radio" :value="brand" v-model="product.brand" :id="`brand_${brand.id}`" class="form-check-input">
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

<script>
    import http from "../../http/http";
    import {CategoryMixin} from "../../mixins/CategoryMixin";
    import {BrandMixin} from "../../mixins/BrandMixin";
    import {UploadStatusMixin} from "../../mixins/UploadStatusMixin";

    import thumb from "../../components/Products/Thumb"

    export default {
        name      : "Show",
        components: {
            thumb
        },
        mixins    : [
            CategoryMixin,
            BrandMixin,
            UploadStatusMixin
        ],
        data() {
            return {
                product     : {
                    media: []
                },
                active_image: 0
            }
        },
        computed  : {
            ProductHasNoMedia() {
                return this.product.media.length === 0;
            },
            ActiveImage() {
                if (this.ProductHasNoMedia) {
                    return "";
                }

                return this.product.media[this.active_image].display
            }
        },
        methods   : {
            getProduct() {
                http.get(`/product/${this.$route.params.id}`).then(response => {
                    this.product = response.data;
                })
            },
            updateProduct() {
                http.post(`/product/${this.product.id}`, {
                    "name"       : this.product.name,
                    "description": this.product.description,
                    "price"      : this.product.price,
                    "brand_id"   : this.product.brand.id,
                    "categories" : this.product.categories,
                    "_method"    : "PATCH"
                }).then(() => {

                })
            },
            deleteProduct() {
                http.post(`/product/${this.product.id}`, {
                    "_method": "DELETE"
                }).then(() => {
                    this.$router.push("/products")
                })
            },

            setActiveImage(value) {
                this.active_image = value
            },

            async uploadImage(image) {
                const formData = new FormData;
                formData.append(`image`, image)
                formData.append("_method", "PATCH");

                let result = await http.post(`/product/${this.product.id}/media`, formData)
                    .then((response) => {
                        this.product.media.push(response.data);
                    });

                return result;
            },
            removeImage() {
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
        },
        created() {
            this.getProduct();
            this.getBrands();
            this.getCategories();
        }
    }
</script>

<style lang="scss" scoped>
</style>