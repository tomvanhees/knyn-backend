<template>
  <div>
    <div class="d-flex justify-content-center">
      <div
        class="small-add-button"
        @click="setShow(true)"
      >
        <span>+</span>
      </div>
    </div>

    <transition
      mode="out-in"
      name="component-fade"
    >
      <div
        v-if="show"
        class="cover"
      >
        git p
        <div class="card card-floating">
          <div class="card-header">
            <div class="card-header-text">
              Merken
            </div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <ul class="list-group list-group-flush">
                <li
                  v-for="brand in Brands"
                  :key="brand.id"
                  class="list-group-item"
                >
                  <div class="d-flex justify-content-between">
                    <div>{{ brand.name }}</div>
                    <div>
                      <button
                        class="btn btn-outline-delete btn-sm"
                        @click="$store.dispatch('brands/deleteBrand', brand)"
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
                    v-model="newBrand.name"
                    class="form-control"
                    type="text"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      @click="addBrand"
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
    import {BrandMixin} from "@/mixins/BrandMixin";
    import {BrandInterface} from "@/interfaces/Brand.interface";
    import {BrandModel} from "@/classes/brand/brand.model";

    @Component
    export default class EditBrands extends mixins(BrandMixin) {
        show = false
        newBrand: BrandInterface = new BrandModel();
        
        setShow(value: boolean): void {
            this.show = value
        }
        
        addBrand(): void {
            this.$store.dispatch("brands/addBrand", this.newBrand)
            this.newBrand = new BrandModel();
        }
    }
</script>

<style lang="scss" scoped>
    .list-group-item {
        background-color: #f6f6f6;
    }
</style>
