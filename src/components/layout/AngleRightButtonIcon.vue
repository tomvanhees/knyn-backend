<template>
  <div class="d-flex">
    {{ text }}
    <div class="button-icon">
      <div class="icon">
        <font-awesome-icon icon="angle-right" />
      </div>
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
