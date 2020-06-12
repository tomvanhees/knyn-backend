<template>
    <div>
        <div class="d-flex justify-content-center">
            <div @click="setShow(true)" class="small-add-button">
                <span>+</span>
            </div>
        </div>

        <transition mode="out-in" name="component-fade">

            <div class="cover" v-if="show">git p
                <div class="card card-floating">
                    <div class="card-header">
                        <div class="card-header-text">
                            Merken
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <ul class="list-group list-group-flush">
                                <li :key="brand.id" class="list-group-item" v-for="brand in Brands">
                                    <div class="d-flex justify-content-between">
                                        <div>{{ brand.name}}</div>
                                        <div>
                                            <button @click="$store.dispatch('brands/deleteBrand', brand)"
                                                    class="btn btn-outline-delete btn-sm">
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
                                    <input class="form-control" type="text" v-model="newBrand">
                                    <div class="input-group-append">
                                        <button @click="addBrand" class="btn btn-outline-primary">Toevoegen</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 d-flex justify-content-end">
                                <button @click="setShow(false)" class="btn btn-outline-primary">Sluiten</button>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {BrandMixin} from "@/mixins/BrandMixin";

    export default Vue.extend({
        name: "EditBrands", mixins: [BrandMixin],

        data() {
            return {
                show: false, newBrand: ""
            }
        }, methods: {
            setShow(value: boolean) {
                this.show = value
            }, addBrand() {
                this.$store.dispatch("brands/addBrand", this.newBrand)
                this.newBrand = "";
            }
        }

    })
</script>

<style lang="scss" scoped>

    .list-group-item {
        background-color: #f6f6f6;
    }
</style>
