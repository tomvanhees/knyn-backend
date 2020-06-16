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
                                        v-for="gallery in galleries"
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
    import Component from "vue-class-component";
    import GalleryIndexCard from "@/components/Gallery/GalleryIndexCard.vue";
    import GalleryService from "@/classes/gallery/gallery.service";
    import {GalleryInterface} from "@/interfaces/Gallery.interface";

    @Component({
        components: {
            "dl-gallery-index-card": GalleryIndexCard
        },
    })
    export default class GalleyIndex extends Vue {
       galleries: Array<GalleryInterface> = []

        created(): void {
            this.getGalleries();
        }

        getGalleries(): void {
        GalleryService.fetch().then(response => {
            this.galleries = response.data
        });

        }
    }
</script>

<style scoped>

</style>
