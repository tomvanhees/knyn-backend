<template>
  <div
    class="thumb"
    :class="{'active' : index === activeImage}"
  >
    <img
      :src="image.thumb"
      alt=""
      style="max-width: 50px"
      class="rounded"
      @click="setActive"
    >
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component,{mixins} from "vue-class-component";

    const ThumbProps = Vue.extend({
        props:{
            image: {},
            index: {},
            activeImage : {}
        }
    })

    @Component
    export default class Thumb extends mixins(ThumbProps) {
        setActive(): void {
            this.$emit("set_active", this.index);
        }
    }
</script>

<style lang="scss" scoped>
    .thumb {
        padding: 5px;
        border-radius: 8px;
        filter: brightness(50%);
        transition: .5s;

        &:hover {
            filter: brightness(100%);
        }

        &.active {
            background-color: #343a40;
            filter: brightness(100%);
        }


        img {
            width: 50px;
            height: 50px;
            border-radius: 8px;
        }
    }
</style>
