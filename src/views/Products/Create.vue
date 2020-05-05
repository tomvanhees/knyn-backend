<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-8">fsdf</div>
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
                            <button class="btn btn-dark" @click="addProduct">Aanmaken</button>
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
                                    <input type="checkbox" :value="category.id" v-model="product.categories" :id="`category_${category.id}`" class="form-check-input">
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
                            <div class="card-title font-weight-bold">
                                Merk
                            </div>
                            <div class="mb-2">

                                <div class="form-check" :key="brand.id" v-for="brand in brands">
                                    <input type="radio" :value="brand.id" v-model="product.brand_id" :id="`brand_${brand.id}`" class="form-check-input">
                                    <label :for="`brand_${brand.id}`" class="form-check-label">{{brand.name}}</label>
                                </div>

                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="new_brand">
                                    <div class="input-group-append">
                                        <button class="btn btn-dark" @click="addBrand">Toevoegen</button>
                                    </div>
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

    export default {
        name   : "Create",
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
                new_category: ""
            }
        },
        methods: {
            addProduct() {
                const formData = new FormData;
                formData.append("product", JSON.stringify(this.product));
                this.images.forEach((image, index) => {
                    formData.append(`image[${index}]`, image)
                })


                http.post("/product", formData).then(() => {
                    this.$router.push("/products");
                })
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
            getBrands() {
                http.get("product/brands").then(response => {
                    this.brands = response.data
                })
            },
            getCategories() {
                http.get("product/categories").then(response => {
                    this.categories = response.data
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
            this.getBrands();
            this.getCategories();
        }
    }
</script>

<style scoped>

</style>