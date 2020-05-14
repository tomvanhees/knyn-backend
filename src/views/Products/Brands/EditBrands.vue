<template>
    <div>
        <div class="d-flex justify-content-center">
            <div class="add-category" @click="setShow(true)">
                <span>+</span>
            </div>
        </div>


        <transition name="component-fade" mode="out-in">

        <div class="cover" v-if="show">
            <div class="card card-floating">
                <div class="card-header">
                    <div class="card-header-text">
                        Merken
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" :key="brand.id" v-for="brand in Brands">
                                <div class="d-flex justify-content-between">
                                    <div>{{ brand.name}}</div>
                                    <div>
                                        <button class="btn btn-outline-delete btn-sm" @click="$store.dispatch('brands/deleteBrand', brand)">
                                            <span>x</span>
                                        </button>
                                    </div>
                                </div>


                            </li>
                        </ul>
                    </div>

                    <div class="row">
                        <div class="col-9">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="new_brand">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary" @click="addBrand">Toevoegen</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 d-flex justify-content-end">
                            <button class="btn btn-outline-primary" @click="setShow(false)">Sluiten</button>
                        </div>

                    </div>
                </div>


            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    import {BrandMixin} from "../../../mixins/BrandMixin";
    import http from "../../../http/http";

    export default {
        name  : "EditBrands",
        mixins: [
            BrandMixin
        ],

        data() {
            return {
                show: false,
                new_brand: ""
            }
        },
        methods: {
            setShow(value){
                this.show = value
            },
            addBrand(){
                http.post("/product/brands", {
                    "name": this.new_brand
                }).then(response => {
                    this.$store.dispatch("brands/addBrand", response.data)

                })

                this.new_brand = "";
            }
        }

    }
</script>

<style lang="scss" scoped>

    .list-group-item {
        background-color: #f6f6f6;
    }
</style>