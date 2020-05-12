<template>
    <div>
        <transition name="component-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Product",
        created() {
            this.$store.dispatch("brands/getBrands");
            this.$store.dispatch("categories/getCategories");
        }
    }
</script>

<style scoped>

</style>