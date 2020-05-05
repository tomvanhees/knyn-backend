<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="gallery.name">
                            <div class="input-group-append">
                                <button class="btn btn-primary" @click="createGallery">gallerij aanmaken</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row">
                <div class="col-12 d-flex flex-wrap">
                    <dl-gallery-index-card :gallery="gallery" :key="gallery.id" v-for="gallery in galleries"></dl-gallery-index-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http/http";
    import GalleryIndexCard from "../../components/Gallery/GalleryIndexCard";

    export default {
        name      : "GalleryIndex",
        components: {
            "dl-gallery-index-card": GalleryIndexCard
        },
        data() {
            return {
                galleries: [],
                gallery  : {
                    name: ""
                }
            }
        },
        methods   : {
            getGalleries() {
                http.get("/gallery").then(response => {
                    this.galleries = response.data
                }).catch(error => {
                    console.log(error)
                })
            },
            createGallery() {
                http.post("/gallery", {
                    name: this.gallery.name
                }).then(response => {
                    this.galleries.push(response.data)
                })
            }
        },
        created() {
            this.getGalleries();
        }
    }
</script>

<style scoped>

</style>