<template>
    <div>
        <h1>
            {{ GalleryName }}
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
                                            v-model="GalleryName"
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
    import Vue                    from "vue";
    import GalleryImage           from "@/components/Gallery/GalleryImage.vue";
    import {MediaInterface}                    from "@/interfaces/MediaInterface";
    import {UploadMedia, UploadMediaInterface} from "@/classes/UploadMedia";

    export default Vue.extend({
                                  name      : "GalleryShow",
                                  components: {
                                      "dl-gallery-image": GalleryImage
                                  },
                                  data() {
                                      return {
                                          uploadMedia: {} as UploadMediaInterface
                                      }
                                  },
                                  computed: {
                                      GalleryName: {
                                          get(): string {
                                              return this.$store.state.gallery.gallery.name;
                                          },
                                          set(name: string) {
                                              this.$store.state.gallery.gallery.name = name;
                                          }
                                      },
                                      GalleryMedia(): Array<MediaInterface> {
                                          return this.$store.state.gallery.gallery.media;
                                      }
                                  },
                                  created() {
                                      this.$store.dispatch("gallery/fetchGallery", this.$route.params.id);
                                      this.uploadMedia = new UploadMedia();

                                  },
                                  beforeDestroy() {
                                      this.$store.dispatch("gallery/clearGallery");
                                  },
                                  methods : {
                                      updateGallery(): void {
                                          this.$store.dispatch("gallery/updateGallery")
                                      },
                                      deleteGallery(): void {
                                          this.$store.dispatch("gallery/deleteGallery")
                                              .then(() => {
                                                  this.$router.push("/inspiratie");
                                              })
                                      },
                                      onMediaChange(event: any): void{
                                          this.uploadMedia.onChangeEvent(event);
                                          this.uploadImage();
                                      },
                                      onMediaDrop(event: any): void{
                                          this.uploadMedia.onDroppedEvent(event);
                                          this.uploadImage();
                                      },
                                      uploadImage(): void {
                                          this.$store.dispatch("gallery/uploadMedia", this.uploadMedia);
                                      },
                                      removeMedia(media: MediaInterface): void {
                                          this.$store.dispatch("gallery/removeMedia", media);
                                      }
                                  }
                              })
</script>

<style lang="scss" scoped>
    .image-container {
        column-count: 3;
        column-width: 250px;
    }
</style>