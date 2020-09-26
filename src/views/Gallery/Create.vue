<template>
  <div>
    <h1>
      {{ !hasGallery ? "Inspiratie toevoegen" : gallery.name }}
    </h1>

    <div class="container">
      <div class="row mb-5">
        <div class="col-12">
          <div class="card">
            <div class="card-body d-flex justify-content-between">
              <div class="form-group">
                <div
                  v-if="!hasGallery"
                  class="input-group"
                >
                  <input
                    v-model="gallery.name"
                    class="form-control"
                    placeholder="Gallerijnaam"
                    type="text"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      @click="createGallery"
                    >
                      aanmaken
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="hasGallery"
              class="card-body"
            >
              <div class="d-flex justify-content-center">
                <label
                  class="large-add-button"
                  for="image"
                  @dragover.prevent
                  @drop="gallery.onDroppedEvent($event)"
                >
                  <span>+</span>
                  <input
                    id="image"
                    ref="upload"
                    multiple
                    style="opacity: 0; position: absolute"
                    type="file"
                    @change="gallery.onChangeEvent($event)"
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
                  v-for="(item) in gallery.media"
                  :key="item.id"
                  :item="item"
                  @remove-media="gallery.deleteMedia(item)"
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
