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
                            <button class="btn btn-dark" @click="updateProduct">Aanpassen</button>
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
        name  : "Show",
        mixins: [
            CategoryMixin,
            BrandMixin
        ],
        data() {
            return {
                product: {}
            }
        },

        methods: {
            updateProduct() {

            },
            getProduct() {
                http.get(`/product/${this.$route.params.id}`).then(response => {
                    this.product = response.data;
                })
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