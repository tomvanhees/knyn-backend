<template>
    <div class="container">
        <div class="row">
            <div class="col-8 d-flex flex-wrap">
                <dl-gallery-image :key="item.id" v-bind:item="item" v-for="(item) in gallery.media" v-on:remove-media="removeMedia"></dl-gallery-image>
            </div>
            <div class="col-4">
                <div class="card mb-2">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="">Gallerij naam</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="gallery.name">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" @click="updateGallery">Aanpassen</button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-danger btn-block">Gallerij verwijderen (wip)</button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label class="d-block bg-info p-5 text-center" @dragover.prevent @drop="onImageDrop">
                                <input ref="upload" type="file" style="opacity: 0; position: absolute" multiple @change="onImageChange">
                                <span class="text-white">Afbeeldingen toevoegen</span>
                            </label>
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

    export default {
        name      : "GalleryShow",
        components: {
            "dl-gallery-image": GalleryImage
        },
        data() {
            return {
                id     : this.$route.params.id,
                gallery: {
                    name : "",
                    media: []
                },

            }
        },

        methods: {
            getGallery() {
                http.get(`/gallery/${this.$route.params.id}`).then(response => {
                    this.gallery = response.data;
                })
            },
            updateGallery() {
                http.post(`/gallery/${this.$route.params.id}`, {
                    "name"   : this.gallery.name,
                    "_method": "PATCH"
                }).then(response => {
                    console.log(response.data)
                })
            },
            onImageDrop(event) {
                event.stopPropagation();
                event.preventDefault();
                this.uploadImages(event.dataTransfer.files);
            },
            onImageChange() {
                this.uploadImages(this.$refs.upload.files);

            },
            uploadImages(fileList) {

                const formData = new FormData;

                fileList.forEach((item, index) => {
                    formData.append(`image[${index}]`, item)
                })

                formData.append("gallery", this.id);
                formData.append("_method", "PATCH");

                http.post(`/gallery/media`, formData).then(response => {
                    this.media = response.data.media
                })
            },
            removeMedia(value) {
                const index = this.media.findIndex(mediaItem => mediaItem === value);

                http.post(`/gallery/media/${value.id}`, {
                    "_method": 'DELETE'
                }).then(() => {
                    this.media.splice(index, 1);
                })
            }
        },
        created() {
            this.getGallery();
        }
    }
</script>

<style scoped>

</style>