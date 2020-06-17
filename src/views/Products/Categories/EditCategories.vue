<template>
    <div>
        <div
                class="d-flex justify-content-center"
                @click="setShow(true)"
        >
            <div class="small-add-button">
                <span>+</span>
            </div>
        </div>
        <transition
                name="component-fade"
                mode="out-in"
        >
            <div
                    v-if="show"
                    class="cover"
            >
                <div class="card card-floating">
                    <div class="card-header">
                        <div class="card-header-text">
                            Categorieën
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <ul class="list-group list-group-flush">
                                <li
                                        v-for="category in Categories"
                                        :key="category.id"
                                        class="list-group-item"
                                >
                                    <div class="d-flex justify-content-between">
                                        <div>{{ category.name }}</div>
                                        <div>
                                            <button
                                                    class="btn btn-outline-delete btn-sm"
                                                    @click="$store.dispatch('categories/deleteCategory', category)"
                                            >
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
                                    <input
                                            v-model="newCategory.name"
                                            type="text"
                                            class="form-control"
                                    >
                                    <div class="input-group-append">
                                        <button
                                                class="btn btn-outline-primary"
                                                @click="addCategory"
                                        >
                                            Toevoegen
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 d-flex justify-content-end">
                                <button
                                        class="btn btn-outline-primary"
                                        @click="setShow(false)"
                                >
                                    Sluiten
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import Component, {mixins} from "vue-class-component";
    import {CategoryMixin} from "@/mixins/CategoryMixin";
    import {CategoryModel} from "@/classes/category/category.model";

    @Component
    export default class EditCategories extends mixins(CategoryMixin) {
        show = false;
        newCategory = new CategoryModel();

        setShow(value: boolean): void {
            this.show = value
        }

        addCategory(): void {
            this.$store.dispatch("categories/addCategory", this.newCategory)
            this.newCategory = new CategoryModel();
        }
    }
</script>

<style scoped>
    .list-group-item {
        background-color: #f6f6f6;
    }
</style>
