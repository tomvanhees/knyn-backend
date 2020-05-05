<template>
    <div id="app">
        <router-view name="menu"/>
        <transition name="component-fade" mode="out-in">
            <router-view/>
        </transition>

    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: "container",
        created() {
            this.$store.dispatch("authentication/tryAutologin")
        }
    }
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


