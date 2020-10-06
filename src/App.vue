<template>
  <div id="app">
    <notifications group="foo" />
    <router-view name="menu" />
    <div class="app-content-container">
      <transition
        name="component-fade"
        mode="out-in"
      >
        <router-view :key="$router.fullPath" />
      </transition>
    </div>
  </div>
</template>


<script>
import "../src/styles/app.scss"
export default{
  name: "App",
  created() {
    this.$store.dispatch("authentication/tryAutologin")
  }
};
</script>
<style lang="scss">

</style>
