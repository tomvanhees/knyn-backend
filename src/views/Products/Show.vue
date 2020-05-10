<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-8">
                                    <div class="mb-3">
                                        <div class="position-relative">
                                            <img :src="ActiveImage" alt="" class="mw-100 rounded">
                                            <div class="position-absolute" style="top:0; right: 0" v-show="!ProductHasNoMedia">
                                                <button class="btn btn-sm  btn-danger" @click="removeImage">X</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-wrap mw-100">
                                        <div :key="index" v-for="(image,index) in product.media" class="mr-1">
                                            <div class="p-1 border rounded" :class="{'bg-dark' : index === active_image}">
                                                <img :src="image.path" alt="" style="max-width: 50px" class="rounded" @click="active_image = index"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div>
                                        <label for="" class="d-block bg-info p-5 text-center" @dragover.prevent @drop="onImageDrop">
                                            <input type="file" ref="images" style="position: absolute; opacity: 0" multiple @change="onImageChange">
                                            <span class="text-white">Afbeeldingen toevoegen</span>
                                        </label>
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

                            <div class="form-group">
                                <button class="btn btn-dark" @click="updateProduct">Aanpassen</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-title font-weight-bold">
                                Categorie
                            </div>
                            <div class="mb-2">
                                <div class="form-check" :key="category.id" v-for="category in categories">
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
                                <div class="form-check" :key="brand.id" v-for="brand in brands">
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

    export default {
        name    : "Show",
        mixins  : [
            CategoryMixin,
            BrandMixin
        ],
        data() {
            return {
                product     : {
                    media: []
                },
                active_image: 0
            }
        },
        computed: {
            ProductHasNoMedia() {
                return this.product.media.length === 0;
            },
            ActiveImage() {
                if (this.ProductHasNoMedia) {
                    return "";
                }

                return this.product.media[this.active_image].path
            }
        },
        methods : {
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
            addImage(fileList) {

                const formData = new FormData;

                fileList.forEach((file, index) => {
                    formData.append(`image[${index}]`, file);
                })

                formData.append("_method", "PATCH")
                http.post(`/product/${this.product.id}/media`, formData).then(response => {
                    this.product.media = response.data;
                })


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
            onImageDrop(event) {
                event.preventDefault();
                event.stopPropagation();

                this.addImage(event.dataTransfer.files)
            },
            onImageChange() {
                this.addImage(this.$refs.images.files)
            }
        },
        created() {
            this.getProduct();
            this.getBrands();
            this.getCategories();
        }
    }
</script>

<style scoped>

</style>