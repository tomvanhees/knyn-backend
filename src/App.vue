<template>
    <div id="app">
        <router-view name="menu"/>
        <router-view/>
    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: "container",
        created() {

            console.log("before dispatch")
            this.$store.dispatch("authentication/tryAutologin")
            console.log("after dispatch")
        }
    }
</script>
<style lang="scss">

</style>


