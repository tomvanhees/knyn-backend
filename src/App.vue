<template>
    <div id="app">
        <notifications/>

        <router-view name="menu"/>
        <transition name="component-fade" mode="out-in">
            <router-view :key="$router.fullPath"/>
        </transition>

    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import "../src/styles/app.scss"

    export default Vue.extend({
                                  name: "App",
                                  created() {
            this.$store.dispatch("authentication/tryAutologin")
        }
                              });
</script>
<style lang="scss">
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s;
    }

    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
