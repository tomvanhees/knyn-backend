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
                                    <div @dragover.prevent @drop="onImageDrop" class="d-flex justify-content-center">
                                        <label class="large-add-button" for="images">
                                            <span class="">+</span>
                                            <input @change="onImageChange" id="images" multiple ref="images"
                                                   style="position: absolute; opacity: 0" type="file">

                                            <div class="loading"></div>
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
                                    <input class="form-control" type="text" v-model="product.name">
                                </div>
                                <div class="form-group">
                                    <label for="">Omschrijving</label>
                                    <textarea class="form-control" id="" name=""
                                              v-model="product.description"></textarea>
                                </div>

                                <div class="form-group">
                                    <label for="">Prijs</label>
                                    <input class="form-control" type="text" v-model="product.price">
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <button @click="addProduct" class="btn btn-outline-primary">Aanmaken</button>
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
                                <div :key="category.id" class="form-check" v-for="category in Categories">
                                    <input :id="`category_${category.id}`" :value="category" class="form-check-input"
                                           type="checkbox" v-model="product.categories">
                                    <label :for="`category_${category.id}`"
                                           class="form-check-label">{{category.name}}</label>
                                </div>
                            </div>
                            <edit-categories></edit-categories>

                        </div>


                        <div class="card-header">
                            <div class="card-header-text">Merk</div>
                        </div>
                        <div class="card-body">
                            <div class="mb-2">
                                <div :key="brand.id" class="form-check" v-for="brand in Brands">
                                    <input :id="`brand_${brand.id}`" :value="brand.id" class="form-check-input"
                                           type="radio" v-model="product.brand_id">
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
