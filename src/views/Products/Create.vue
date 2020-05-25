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
                                    <div class="d-flex justify-content-center" @dragover.prevent @drop="onImageDrop">
                                        <label for="images" class="large-add-button">
                                            <span class="">+</span>
                                            <input type="file" id="images" ref="images" style="position: absolute; opacity: 0" multiple @change="onImageChange">

                                            <div class="loading" :style="ProgressbarProgression"></div>
                                        </label>
                                    </div>
                                </div>

                                <div class="col-8">(Voorbeeld van de afbeeldingen WIP)</div>
                                <div class="col-4">
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
                            <button class="btn btn-outline-primary" @click="addProduct">Aanmaken</button>
                        </div>
                    </div>


                </div>
                <div class="col-4">
                    <div class="card">

                        <div class="card-header">
                            <div class="card-header-text">Categorie</div>
                        </div>
                        <div class="card-body">
                            <div class="mb-2">
                                <div class="form-check" :key="category.id" v-for="category in Categories">
                                    <input type="checkbox" :value="category" v-model="product.categories" :id="`category_${category.id}`" class="form-check-input">
                                    <label :for="`category_${category.id}`" class="form-check-label">{{category.name}}</label>
                                </div>
                            </div>
                                <edit-categories></edit-categories>

                        </div>


                        <div class="card-header">
                            <div class="card-header-text">Merk</div>
                        </div>
                        <div class="card-body">
                            <div class="mb-2">
                                <div class="form-check" :key="brand.id" v-for="brand in Brands">
                                    <input type="radio" :value="brand.id" v-model="product.brand_id" :id="`brand_${brand.id}`" class="form-check-input">
                                    <label :for="`brand_${brand.id}`" class="form-check-label">{{brand.name}}</label>
                                </div>
                            </div>


                                <edit-brands></edit-brands>

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

    import EditBrands from "@/views/Products/Brands/EditBrands.vue";
    import EditCategories from "@/views/Products/Categories/EditCategories.vue";

    import {BrandInterface} from "@/interfaces/BrandInterface";
    import {CategoryInterface} from "@/interfaces/CategoryInterface";
    import {ProductInterface} from "@/interfaces/ProductInterface";

    export default Vue.extend({
        name: "Create",

        components: {
            EditBrands,
            EditCategories
        },
        mixins    : [
            CategoryMixin,
            BrandMixin,
            UploadStatusMixin
        ],
        data() {
            return {
                product     : {} as ProductInterface,
                images      : [] as Array<Object>,
                brands      : [] as Array<BrandInterface>,
                categories  : [] as Array<CategoryInterface>,
                new_brand   : "" as string,
                new_category: "" as string,
                upload      : {
                    status        : 0,
                    current_upload: 1 as number
                }
            }
        },
        computed  : {
            ProductHasImages(): boolean {
                return this.images.length > 0
            },
            AmountOfImages(): number {
                if (this.ProductHasImages) {
                    return this.images.length
                }
                return 0
            },
            UploadStatusText(): string {
                switch (this.upload.status) {
                    case 0:
                        return "Afbeeldingen toevoegen"
                    case 1:
                        return `Afbeelding ${this.upload.current_upload} van ${this.AmountOfImages}`
                }

                return "";
            }
        },
        methods   : {
            addProduct() {
                http.post("/product", this.product)
                    .then((response) => {

                        if (this.ProductHasImages) {
                            this.uploadImages(response.data.product.id)
                        }

                        this.$router.push("/products");
                    })
            },
            uploadImages(product_id: number) {
                this.upload.status = 1

                this.images.forEach((image: any, index: number) => {
                    this.upload.current_upload = ++index

                    const formData = new FormData;
                    formData.append("image", image);
                    formData.append("_method", "PATCH");

                    http.post(`/product/${product_id}/media`, formData);
                })


                this.upload.status = 0
            },
            addCategory() {
                http.post("/product/categories", {
                    "name": this.new_category
                }).then(response => {
                    this.categories.push(response.data)
                })

                this.new_category = "";
            },
            onImageDrop(event: any) {
                event.preventDefault();
                event.stopPropagation();

                event.dataTransfer.files.forEach((image: any) => {
                    this.images.push(image)
                })
            },
            onImageChange() {

                this.$refs.images.files.forEach(image => {
                    this.images.push(image)
                })
            }
        }
    })
</script>

<style scoped>

</style>