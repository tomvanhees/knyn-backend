<template>
  <div
    class="rounded-selection"
  >
    <input
      :id="`${base}_${color}`"
      v-model="configurationValue"
      type="radio"
      :value="color"
      :name="base"
      @change="$emit('input', $event.target.value)"
    >
    <label
      :for="`${base}_${color}`"
      :class="color"
    /> {{ text }}
  </div>
</template>

<script>
export default {
  name: 'SelectAccentInput',
  props: {
    value: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    base: {
      type: String,
      default: null
    }
  },
  computed: {
    configurationValue () {
      return this.value
    }
  },
}
</script>

<style scoped>

</style>
