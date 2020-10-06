<template>
  <div class="d-flex">
    {{ text }}
    <div class="ml-5">
      <font-awesome-icon icon="angle-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AngleRightButtonIcon',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
