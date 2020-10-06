<template>
  <div id="image-gallery">
    <div v-if="hasImages">
      <div class="image-container">
        <image-card
          v-for="image in imageData"
          :key="`uploaded_image_${image.id}`"
          :item="image"
          @image-removed="removeImage"
        />
      </div>
    </div>
    <div v-else>
      <div class="text-center mt-25">
        Er zijn geen afbeeldingen gevonden
      </div>
    </div>
  </div>
</template>

<script>
import ImageCard from '@/components/Images/ImageCard'

export default {
  name: 'ImageGallery',
  components: {
    ImageCard
  },
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      imageData: [],
    }
  },
  computed: {
    hasImages () {
      return this.images.length !== 0
    }
  },
  watch: {
    images (newData) {
      this.imageData = newData

    }
  },
  methods: {
    removeImage (event) {
      const index = this.findIndex(event)
      this.imageData.splice(index, 1)
    },
    findIndex (image) {
      const index = this.imageData.findIndex(data => data.id === image.id)
      if (index === -1) throw Error('Index not found')
      return index
    }
  }
}
</script>

<style scoped>

</style>
