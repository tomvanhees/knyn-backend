<template>
    <div>
        <transition name="component-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>


    export default {
        name: "Feedback",

    }
</script>

<style scoped>

</style>