<template>
  <div>
    <transition
      mode="out-in"
      name="component-fade"
    >
      <div class="yippo-container">
        <router-view />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Product',

}
</script>

<style scoped>

</style>
