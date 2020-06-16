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
                                        @drop="onMediaDrop"
                                        class="large-add-button"
                                        for="image"
                                >
                                    <span>+</span>
                                    <input
                                            @change="onMediaChange"
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
                                        @remove-media="removeMedia"
                                        v-for="(item) in GalleryMedia"
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
    import {GalleryInterface} from "@/interfaces/Gallery.interface";
    import {UploadMediaClass, UploadMediaInterface} from "@/classes/UploadMedia.class";
    import GalleryService from "@/classes/gallery/gallery.service";
    import {GalleryModel} from "@/classes/gallery/gallery.model";

    @Component({
        components: {
            "dl-gallery-image": GalleryImage
        }
    })
    export default class GalleryCreate extends Vue {
        gallery: GalleryInterface = new GalleryModel();
        uploadMedia = {} as UploadMediaInterface;

        get hasGallery(): boolean {
            const gallery = this.$store.getters["gallery/getGallery"];
            return typeof gallery.id !== 'undefined';
        }

        get GalleryMedia(): Array<MediaInterface> {
            return this.$store.state.gallery.gallery.media;
        }

        createGallery(): void {
            GalleryService.create(this.gallery).then(()=>{
                console.log('Gallery created')
            })

        }

        onMediaChange(event: any): void {
            this.uploadMedia.onChangeEvent(event);
            this.uploadImage();
        }

        onMediaDrop(event: any): void {
            this.uploadMedia.onDroppedEvent(event);
            this.uploadImage();
        }

        uploadImage(): void {
            this.$store.dispatch("gallery/uploadMedia", this.uploadMedia);
        }

        removeMedia(media: MediaInterface): void {
            this.$store.dispatch("gallery/removeMedia", media);
        }

        created(): void {
            this.$store.dispatch("gallery/clearGallery");
            this.uploadMedia = new UploadMediaClass();
        }
    }
</script>

<style lang="scss" scoped>
    .image-container {
        columns: 4 250px;
    }
</style>
