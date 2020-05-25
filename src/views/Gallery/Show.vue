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
                    v-model="GalleryName"
                    class="form-control"
                    type="text"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      @click="updateGallery"
                    >
                      aanpassen
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <button
                  class="btn btn-outline-danger btn-block"
                  @click="deleteGallery"
                >
                  Gallerij verwijderen
                </button>
              </div>
            </div>


            <div class="card-body">
              <div class="d-flex justify-content-center">
                <label
                  class="large-add-button"
                  for="image"
                  @dragover.prevent
                  @drop="onImageDrop"
                >
                  <span>+</span>
                  <input
                    id="image"
                    ref="upload"
                    multiple
                    style="opacity: 0; position: absolute"
                    type="file"
                    @change="onImageChange"
                  >
                  <div
                    :style="ProgressbarProgression"
                    class="loading"
                  />
                </label>
              </div>
            </div>


            <div class="card-body">
              <div class="image-container">
                <dl-gallery-image
                  v-for="(item) in GalleryMedia"
                  :key="item.id"
                  :item="item"
                  @remove-media="removeMedia"
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
    import GalleryImage from "@/components/Gallery/GalleryImage.vue";
    import {UploadStatusMixin} from "@/mixins/UploadStatusMixin";
    import {MediaInterface} from "@/interfaces/MediaInterface";

    export default Vue.extend({
                                  name: "GalleryShow", components: {
            "dl-gallery-image": GalleryImage
        }, mixins                     : [UploadStatusMixin], data() {
            return {
                id: this.$route.params.id
            }
        }, computed                   : {
            GalleryName: {
                get(): string {
                    return this.$store.state.gallery.gallery.name;
                }, set(name) {
                    this.$store.state.gallery.gallery.name = name;
                }
            }, GalleryMedia(): Array<MediaInterface> {
                return this.$store.state.gallery.gallery.media;
            }
        }, created() {
            this.getGallery();
        }, methods                    : {
            getGallery() {
                this.$store.dispatch("gallery/fetchGallery", this.$route.params.id)
            }, updateGallery() {
                this.$store.dispatch("gallery/updateGallery")
            }, deleteGallery() {
                this.$store.dispatch("gallery/deleteGallery")
                    .then(() => {
                        this.$router.push("/inspiratie");
                    })
            }, uploadImage(media: any) {
                 this.$store.dispatch("gallery/uploadMedia", media);
            }, removeMedia(media: MediaInterface) {
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