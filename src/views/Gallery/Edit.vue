<template>
  <div>
    <div class="view-title-container">
      <h1 class="view-title">
        {{ GalleryTitle }}
      </h1>
      <div v-if="hasGallery">
        <remove-gallery-button :gallery="gallery" />
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="">Gallerijnaam</label>
          <div class="input-group">
            <input
              v-model="gallery.name"
              class="form-control"
              type="text"
            >
            <div class="input-group-append">
              <button
                class="btn btn-primary input-group-button"
                @click="saveGallery"
              >
                {{ hasGallery ? 'Aanpassen' : 'Aanmaken' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-title">
        Afbeeldingen toevoegen
      </div>
      <div class="card-body">
        <div>
          <image-upload
            :is-active="hasGallery"
            :upload-text="FileUploadLines"
            :upload-to="`/gallery/${gallery.id}/media`"
            @addMediaFile="addMediaFile"
          />
        </div>
      </div>
    </div>

    <div class="card mt-25">
      <div class="card-title">
        Afbeeldingen
      </div>
      <div class="card-body">
        <div>
          <image-gallery :images="gallery.media" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GalleryModel } from '@/classes/gallery/gallery.model'
import GalleryService from '@/classes/gallery/gallery.service'
import RemoveGalleryButton from '@/components/Gallery/RemoveGalleryButton.vue'
import ImageUpload from '@/components/Images/ImageUpload.vue'
import ImageGallery from '@/components/Images/ImageGallery'
import { MessagesService } from '@/classes/MessagesService'

export default {
  name: 'Edit',
  components: {
    RemoveGalleryButton,
    ImageUpload,
    ImageGallery
  },
  data () {
    return {
      gallery: {}
    }
  },
  computed: {
    /**
     * Checks if we are editing or creating a new gallery
     * @return boolean
     */
    hasGallery () {
      return this.gallery.id !== 0
    },
    /**
     * Return the title of this component
     * @return string
     */
    GalleryTitle () {
      return this.hasGallery ? this.gallery.name : 'Inspiratie toevoegen'
    },

    /**
     * Returns the text displayed on the file upload element
     * @return string
     */
    FileUploadLines () {
      if (!this.hasGallery) {
        return 'Er moet eerst een gallerij aangemaak worden voordat je afbeeldingen kunt toevoegen.'
      }
      return 'Sleep de bestanden naar hier of klik om bestanden toe te voegen'
    }
  },
  created () {
    this.gallery = new GalleryModel()

    if (this.$route.params.id !== undefined) {
      GalleryService.find(this.$route.params.id)
          .then((response) => {
            this.gallery = new GalleryModel().deserialize(response.data['content'])
          })
    }

  },
  methods: {
    addMediaFile (mediaFile) {
      this.gallery.media.push(mediaFile)
    },
    /**
     * Removes a image from the media array
     * @param media
     * @return void
     * */
    removeMedia (media) {
      const index = this.gallery.media.findIndex((mediaItem) => mediaItem.id === media.id)
      this.gallery.media.splice(index, 1)
    },

    /**
     * Checks if we are creating or updating
     * */
    saveGallery () {
      this.hasGallery ? this.updateGallery() : this.createGallery()
    },

    /**
     * Creates a a new gallery and sets it as a usable one
     * */
    createGallery () {
      GalleryService.create(this.gallery)
          .then((response) => {
            this.gallery = new GalleryModel()
                .deserialize(response.data)
          })
    },

    /**
     * Update gallery
     */
    updateGallery () {
      GalleryService.update(this.gallery).then(response => {
        MessagesService.showSuccesMessage(response.data.message)
      })
    }
  }
}
</script>
