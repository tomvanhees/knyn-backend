<template>
  <div
    class="card m-2"
    style="width: 250px"
  >
    <img
      :src="item.path"
      class="card-img-top"
      alt=""
      @error="imageUrlAlt"
    >

    <div
      class="position-absolute"
      style="top:0; right: 0;"
    >
      <button
        class="btn btn-outline-delete btn-sm"
        @click="removeMedia"
      >
        <span>x</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component, {mixins} from "vue-class-component";

    const GalleryImageProps = Vue.extend({
        props: {
            item: {
                type: Object,
                required: true
            }
        },
    })

    @Component
    export default class GalleryImage extends mixins(GalleryImageProps) {
        removeMedia(): void {
            this.$emit("remove-media", this.item)
        }

        imageUrlAlt(event: any): void {
            event.target.src = "https://picsum.photos/250/250"
        }

    }
</script>

<style lang="scss" scoped>

</style>
