<template>
  <div
    class="gallery-image"
  >
    <div class="gallery-image-container">
      <img
        :src="item.path"
        class="card-img-top"
        alt=""
      >
    </div>


    <div class="button-container">
      <div
        class="delete-button"
        title="Verwijder afbeelding"
        @click="removeMedia"
      >
        <span>
          <font-awesome-icon icon="trash" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/http/http";

export default {
  name: 'UploadImages',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods:{
    removeMedia() {
      http.post(`/media/${this.item.id}`, {
        '_method': 'DELETE'
      }).then(() => {
        this.mediaRemoved()
      })
    },
    mediaRemoved() {
      this.$emit('image-removed', this.item)
    },
  }
}
</script>
