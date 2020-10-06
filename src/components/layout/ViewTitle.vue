<template>
  <div class="view-title-container">
    <h1 class="view-title">
      {{ title }}
    </h1>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewTitle",
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
