<template>
    <div>
        <h1>
            {{!hasGallery ? "Inspiratie toevoegen" : gallery.name }}
        </h1>

        <div class="container">
            <div class="row mb-5">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body d-flex justify-content-between">
                            <div class="form-group">
                                <div
                                        class="input-group"
                                        v-if="!hasGallery"
                                >
                                    <input
                                            class="form-control"
                                            placeholder="Gallerijnaam"
                                            type="text"
                                            v-model="gallery.name"
                                    >
                                    <div class="input-group-append">
                                        <button
                                                @click="createGallery"
                                                class="btn btn-outline-primary"
                                        >
                                            aanmaken
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                                class="card-body"
                                v-if="hasGallery"
                        >
                            <div class="d-flex justify-content-center">
                                <label
                                        @dragover.prevent
                                        @drop="gallery.onDroppedEvent($event)"
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
    import GalleryService from "@/classes/gallery/gallery.service";
    import {GalleryModel} from "@/classes/gallery/gallery.model";

    @Component({
        components: {
            "dl-gallery-image": GalleryImage
        }
    })
    export default class GalleryCreate extends Vue {
        gallery: GalleryModel = new GalleryModel();

        get hasGallery(): boolean {
            return this.gallery.id !== 0;
        }

        createGallery(): void {
            GalleryService.create(this.gallery)
                .then((response) => {
                this.gallery = new GalleryModel()
                    .deserialize(response.data);
            })
        }
    }
</script>

<style lang="scss" scoped>
    .image-container {
        columns: 4 250px;
    }
</style>
