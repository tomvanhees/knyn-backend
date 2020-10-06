<template>
  <div>
    <router-link
      class="card gallery-index-card"
      :to="`/inspiratie/${gallery.id}/${gallery.slug}`"
    >
      <div class="image">
        <img
          :src="gallery.cover"
          class="gallery-image"
          alt=""
        >
      </div>
      <div class="card-body">
        <div class="title">
          {{ gallery.name }}
        </div>
        <div class="mt-30 text-center" />
      </div>
    </router-link>
  </div>
</template>

<script>
export default{
  name: 'GalleryIndexCard',
  props: {
    gallery: {
      type: Object,
      required: true
    }
  }
}
</script>
