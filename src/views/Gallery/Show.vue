<template>
    <div>
        <h1>
            {{ gallery.name }}
        </h1>
        <div class="container">
            <div class="row mb-5">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body d-flex justify-content-between">
                            <div class="form-group">
                                <div class="input-group">
                                    <input
                                            class="form-control"
                                            type="text"
                                            v-model="gallery.name"
                                    >
                                    <div class="input-group-append">
                                        <button
                                                @click="updateGallery"
                                                class="btn btn-outline-primary"
                                        >
                                            aanpassen
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <button
                                        @click="deleteGallery"
                                        class="btn btn-outline-danger btn-block"
                                >
                                    Gallerij verwijderen
                                </button>
                            </div>
                        </div>


                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <label
                                        @dragover.prevent
                                        @drop="gallery.onDroppedEdvent($event)"
                                        class="large-add-button"
                                        for="image"
                                >
                                    <span>+</span>
                                    <input
                                            @change="gallery.onChangeEvent($event)"
                                            id="image"
                                            multiple
                                            ref="upload"
                                            style="opacity: 0; position: absolute"
                                            type="file"
                                    >
                                    <div
                                            class="loading"
                                    />
                                </label>
                            </div>
                        </div>


                        <div class="card-body">
                            <div class="image-container">
                                <dl-gallery-image
                                        :item="item"
                                        :key="item.id"
                                        @remove-media="gallery.deleteMedia(item)"
                                        v-for="(item) in gallery.media"
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
    import GalleryImage from "@/components/Gallery/GalleryImage.vue";
    import {MediaInterface} from "@/interfaces/MediaInterface";
    import {UploadMediaClass, UploadMediaInterface} from "@/classes/UploadMedia.class";
    import {GalleryModel} from "@/classes/gallery/gallery.model";
    import {GalleryInterface} from "@/classes/gallery/gallery.interface";
    import GalleryService from "@/classes/gallery/gallery.service";
    import {AxiosResponse} from "axios";

    @Component({
        components: {
            "dl-gallery-image": GalleryImage
        },
    })
    export default class GalleryShow extends Vue {
        gallery: GalleryModel = new GalleryModel();

        created(): void {
            GalleryService.find(this.$route.params.id)
                .then((response: AxiosResponse) => {
                    this.gallery = new GalleryModel().deserialize(response.data);
                });
        }

        updateGallery(): void {
            GalleryService.update(this.gallery)
        }

        deleteGallery(): void {
            GalleryService.delete(this.gallery).then(() => {
                this.$router.push("/inspiratie");
            })
        }
    }
</script>

<style lang="scss" scoped>
    .image-container {
        column-count: 3;
        column-width: 250px;
    }
</style>
