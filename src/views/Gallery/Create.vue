<template>
    <div>
        <h1>
            Inspiratie toevoegen
        </h1>
        <div class="container">
            <div class="row mb-5">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body d-flex justify-content-between">
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Gallerijnaam" v-model="gallery.name">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-primary" @click="createGallery">aanmaken</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body" v-if="gallery.id">
                            <div class="d-flex justify-content-center">
                                    <label class="large-add-button" for="image" @dragover.prevent @drop="onImageDrop">
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
        name      : "GalleryCreate",
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
                    id   : "",
                    name : "",
                    media: []
                },
            }
        },
        methods   : {
            createGallery() {
                http.post(`/gallery`, {
                    "name": this.gallery.name,
                }).then(response => {
                    this.gallery = response.data
                }).catch(errors => {
                    console.log(errors)
                })
            },
            async uploadImage(image) {
                const formData = new FormData;
                formData.append(`image`, image)
                formData.append("_method", "PATCH");

                let result = await http.post(`/gallery/${this.gallery.id}/media`, formData)
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
        }
    }
</script>

<style lang="scss" scoped>
    .image-container {
        columns: 4 250px;
    }
</style>