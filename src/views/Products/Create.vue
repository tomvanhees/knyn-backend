<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-8">(Voorbeeld van de afbeeldingen WIP)</div>
                                <div class="col-4">
                                    <label for="images" class="d-block bg-info p-5 text-center" @dragover.prevent @drop="onImageDrop">
                                        <input type="file" id="images" ref="images" style="position: absolute; opacity: 0" multiple @change="onImageChange">
                                        <span class="text-white">{{ UploadStatusText}}</span>
                                    </label>
                                </div>
                            </div>


                        </div>
                        <div class="card-body">
                            <div>
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
                            </div>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-dark" @click="addProduct">Aanmaken</button>
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
                               <edit-brands></edit-brands>
                            </div>

                            <div class="mb-2">
                                <div class="form-check" :key="category.id" v-for="category in Categories">
                                    <input type="checkbox" :value="category" v-model="product.categories" :id="`category_${category.id}`" class="form-check-input">
                                    <label :for="`category_${category.id}`" class="form-check-label">{{category.name}}</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="new_category">
                                    <div class="input-group-append">
                                        <button class="btn btn-dark" @click="addCategory">Toevoegen</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">

                            <div class="d-flex justify-content-between">
                                <div class="card-title font-weight-bold">
                                    Merk
                                </div>
                                <div class="btn btn-sm btn-dark">Bewerken</div>
                            </div>

                            <div class="mb-2">
                                <div class="form-check" :key="brand.id" v-for="brand in Brands">
                                    <input type="radio" :value="brand.id" v-model="product.brand_id" :id="`brand_${brand.id}`" class="form-check-input">
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
    import EditBrands from "./Brands/EditBrands";


    export default {
        name    : "Create",

        components:{
          EditBrands
        },
        mixins  : [
            CategoryMixin,
            BrandMixin
        ],
        data() {
            return {
                product     : {
                    name       : "",
                    description: "",
                    price      : "",
                    brand_id   : "",
                    categories : [],
                },
                images      : [],
                brands      : [],
                categories  : [],
                new_brand   : "",
                new_category: "",
                upload      : {
                    status        : 0,
                    current_upload: 1
                }
            }
        },
        computed: {
            ProductHasImages() {
                return this.images.length > 0
            },
            AmountOfImages() {
                if (this.ProductHasImages) {
                    return this.images.length
                }
                return 0
            },
            UploadStatusText() {
                switch (this.upload.status) {
                    case 0:
                        return "Afbeeldingen toevoegen"
                    case 1:
                        return `Afbeelding ${this.current_upload} van ${this.AmountOfImages}`
                }

                return "";
            }
        },
        methods : {
            addProduct() {
                http.post("/product", this.product)
                    .then((response) => {

                        if (this.ProductHasImages) {
                            this.uploadImages(response.data.product.id)
                        }

                        this.$router.push("/products");
                    })
            },
            uploadImages(product_id) {
                this.upload.status = 1

                this.images.forEach((image, index) => {
                    this.upload.current_upload = ++index

                    const formData = new FormData;
                    formData.append("image", image);
                    formData.append("_method", "PATCH");

                    http.post(`/product/${product_id}/media`, formData);
                })


                this.upload.status = 0
            },
            addBrand() {
                http.post("/product/brands", {
                    "name": this.new_brand
                }).then(response => {
                    this.brands.push(response.data)
                })

                this.new_brand = "";
            },
            addCategory() {
                http.post("/product/categories", {
                    "name": this.new_category
                }).then(response => {
                    this.categories.push(response.data)
                })

                this.new_category = "";
            },
            onImageDrop(event) {
                event.preventDefault();
                event.stopPropagation();

                event.dataTransfer.files.forEach(image => {
                    this.images.push(image)
                })
            },
            onImageChange() {
                this.$refs.images.files.forEach(image => {
                    this.images.push(image)
                })
            }
        }
    }
</script>

<style scoped>

</style>