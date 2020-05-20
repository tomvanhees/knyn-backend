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
                                <dl-gallery-index-card :gallery="gallery" :key="gallery.id" v-for="gallery in galleries"></dl-gallery-index-card>
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