<template>
  <div>
    <h1>Inspiratie</h1>
    <div class="container">
      <div class="row ">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12 d-flex justify-content-center my-3">
                  <router-link :to="`/inspiratie/create`">
                    <div class="large-add-button">
                      <span>+</span>
                    </div>
                  </router-link>
                </div>
              </div>

              <div class="row">
                <dl-gallery-index-card
                  v-for="gallery in $store.getters['gallery/getGalleries']"
                  :key="gallery.id"
                  :gallery="gallery"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import GalleryIndexCard from "@/components/Gallery/GalleryIndexCard.vue";

    export default Vue.extend({
        name      : "GalleryIndex",
        components: {
            "dl-gallery-index-card": GalleryIndexCard
        },
        created() {
            this.getGalleries();
        },
        methods   : {
            getGalleries(): void {
                this.$store.dispatch("gallery/fetchGalleries");
            },
        }
    })
</script>

<style scoped>

</style>