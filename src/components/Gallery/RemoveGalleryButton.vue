<template>
  <div class="delete-button">
    <div
      class="title-button-container"
      @click="deleteGallery"
    >
      <div class="title-text">
        Gallerij verwijderen
      </div>
      <div class="title-button">
        <span><font-awesome-icon icon="trash" /></span>
      </div>
    </div>
  </div>
</template>

<script>
import GalleryService from '@/classes/gallery/gallery.service'

export default {
  name: 'RemoveGalleryButton',
  props: {
    gallery: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteGallery () {
      if (confirm('Ben je zeker dat je deze gallerij wilt verwijderen?')) {
        GalleryService.delete(this.gallery).then(() => {
          this.$router.push('/inspiratie')
        })
      }
    }
  }

}
</script>

