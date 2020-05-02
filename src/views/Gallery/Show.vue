<template>
    <div class="container">
        <div class="row">
            <div class="col-8 d-flex flex-wrap">
                <dl-gallery-image :key="index" v-bind:item="item" v-for="(item, index) in media"></dl-gallery-image>

            </div>
            <div class="col-4">
                <div class="form-group">
                    <div class="card">
                        <div class="card-body">
                            <label for="">Gallerij naam</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="gallery.name">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" @click="updateGallery">Aanpassen</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="card">
                        <div class="card-body">
                            <label class="d-block bg-info p-5 text-center">
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
                    name: ""
                },
                media:[]
            }
        },

        methods: {
            getGallery() {
                http.get(`/gallery/${this.$route.params.id}`).then(response => {
                    this.gallery = response.data.gallery
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

            onImageDrop() {

            },
            onImageChange() {
                this.uploadImages(this.$refs.upload.files);

            },
            uploadImages(fileList) {

                const formData = new FormData;

                fileList.forEach((item,index) => {
                    formData.append(`image[${index}]`, item)
                })

                formData.append("_method", "PATCH");

                http.post(`/gallery/${this.$route.params.id}/media`, formData).then(response => {
                    this.media = response.data
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