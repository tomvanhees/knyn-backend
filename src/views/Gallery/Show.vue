<template>
    <div>
        <h1>
            {{ gallery.name}}
        </h1>
        <div class="container">
            <div class="row mb-5">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body d-flex justify-content-between">
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="gallery.name">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-primary" @click="updateGallery">aanpassen</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-outline-danger btn-block" @click="deleteGallery">Gallerij verwijderen</button>
                            </div>
                        </div>


                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <label class="add-inspiration" for="image" @dragover.prevent @drop="onImageDrop">
                                    <span>+</span>
                                    <input id="image" ref="upload" type="file" style="opacity: 0; position: absolute" multiple @change="onImageChange">
                                    <div class="loading" :style="ProgressbarProgression"></div>
                                </label>
                            </div>
                        </div>


                        <div class="card-body">
                            <div class="image-container">
                                <dl-gallery-image :key="item.id" v-bind:item="item" v-for="(item) in gallery.media" v-on:remove-media="removeMedia"></dl-gallery-image>
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
    import GalleryImage from "../../components/Gallery/GalleryImage";
    import {UploadStatusMixin} from "../../mixins/UploadStatusMixin";


    export default {
        name      : "GalleryShow",
        components: {
            "dl-gallery-image": GalleryImage
        },
        mixins    : [
            UploadStatusMixin
        ],
        data() {
            return {
                id     : this.$route.params.id,
                gallery: {
                    name : "",
                    media: []
                },
            }
        },
        methods   : {
            getGallery() {
                http.get(`/gallery/${this.$route.params.id}`).then(response => {
                    this.gallery = response.data;
                })
            },
            updateGallery() {
                http.post(`/gallery/${this.gallery.id}`, {
                    "name"   : this.gallery.name,
                    "_method": "PATCH"
                }).then(response => {
                    console.log(response.data)
                })
            },
            deleteGallery() {
                http.post(`/gallery/${this.gallery.id}`, {
                    "_method": "DELETE"
                }).then(() => {
                    this.$router.push("/inspiratie");
                })
            },
            async uploadImage(image) {
                const formData = new FormData;
                formData.append(`image`, image)
                formData.append("_method", "PATCH");

                let result = await http.post(`/gallery/${this.$route.params.id}/media`, formData)
                    .then((response) => {
                        this.gallery.media.push(response.data);
                    });

                return result;
            },

            removeMedia(value) {
                const index = this.gallery.media.findIndex(mediaItem => mediaItem === value);

                http.post(`/gallery/${this.$route.params.id}/media/${value.id}`, {
                    "_method": 'DELETE'
                }).then(() => {
                    this.gallery.media.splice(index, 1);
                })
            }
        },
        created() {
            this.getGallery();
        }
    }
</script>

<style lang="scss" scoped>
    .image-container {
        columns: 4 250px;
    }
</style>