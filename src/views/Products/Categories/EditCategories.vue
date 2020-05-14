<template>
    <div>
        <div class="d-flex justify-content-center" @click="setShow(true)">
            <div class="add-category">
                <span>+</span>
            </div>
        </div>
        <transition name="component-fade" mode="out-in">
            <div class="cover" v-if="show">
                <div class="card card-floating">
                    <div class="card-header">
                        <div class="card-header-text">
                            Categorieën
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" :key="category.id" v-for="category in Categories">
                                    <div class="d-flex justify-content-between">
                                        <div>{{ category.name}}</div>
                                        <div>
                                            <button class="btn btn-outline-delete btn-sm" @click="$store.dispatch('categories/deleteCategory', category)">
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
                                    <input type="text" class="form-control" v-model="new_category">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-primary" @click="addCategory">Toevoegen</button>
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
    import http from "../../../http/http";
    import {CategoryMixin} from "../../../mixins/CategoryMixin";

    export default {
        name   : "EditCategories",
        mixins : [CategoryMixin],
        data() {
            return {
                show        : false,
                new_category: ""
            }
        },
        methods: {
            setShow(value) {
                this.show = value
            },
            addCategory() {
                http.post("/product/categories", {
                    "name": this.new_category
                }).then(response => {
                    this.$store.dispatch("categories/addCategory", response.data)

                })

                this.new_category = "";
            }
        }
    }
</script>

<style scoped>
    .list-group-item {
        background-color: #f6f6f6;
    }
</style>