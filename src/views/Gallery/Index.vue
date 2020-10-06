<template>
  <div>
    <view-title title="Inspiratie">
      <create-new-button to="/inspiratie/create" />
    </view-title>
    <div>
      <main>
        <div v-if="galleries.length ===0">
          <div class="card">
            <div class="card-body">
              <div class="text-center">
                Er zijn geen galerijen gevonden
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="gallery-index-grid">
            <dl-gallery-index-card
              v-for="gallery in galleries"
              :key="gallery.id"
              :gallery="gallery"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import GalleryIndexCard from '@/components/Gallery/GalleryIndexCard'
import GalleryService from '@/classes/gallery/gallery.service'
import CreateNewButton from '@/components/Buttons/CreateNewHeaderButton'
import ViewTitle from '@/components/layout/ViewTitle'

export default {
  name: 'GalleryIndex',
  components: {
    'dl-gallery-index-card': GalleryIndexCard,
    CreateNewButton,
    ViewTitle
  },
  data () {
    return {
      galleries: []
    }
  },
  created () {
    this.getGalleries()
  },
  methods: {
    getGalleries () {
      GalleryService.fetch().then(response => {
        this.galleries = response.data.content.collection
      })
    }

  }
}
</script>

<style scoped>

</style>
