<template>
  <div>
    <transition
      mode="out-in"
      name="component-fade"
    >
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        name: "Product",
        created() {
            this.$store.dispatch("brands/getBrands");
            this.$store.dispatch("categories/getCategories");
        }
    })
</script>

<style scoped>

</style>
