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
                    <div class="card m-2" style="width: 300px;" :key="gallery.id" v-for="gallery in galleries">
                        <router-link :to="`/gallery/${gallery.id}/${gallery.slug}`">
                            <img :src="gallery.cover" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">{{ gallery.name}}</h5>
                                <p class="card-text"></p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import http from "../../http/http";

    export default {
        name   : "GalleryIndex",
        data() {
            return {
                galleries: [],
                gallery  : {
                    name: ""
                }
            }
        },
        methods: {
            getGalleries() {
                http.get("/gallery").then(response => {
                    this.galleries = response.data.galleries
                }).catch(error => {
                    console.log(error)
                })
            },
            createGallery() {
              http.post("/gallery",{
                  name: this.gallery.name
              }).then(response =>{
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