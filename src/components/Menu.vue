<template>
    <div>
        <div class="container">
            <div class="row mb-5">
                <router-link :tag="a" to="/gallery">Gallery</router-link> | <router-link to="/feedback">feedback</router-link>  | <router-link to="/products">products</router-link> | <router-link to="/information">information</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu"
    }
</script>

<style scoped>

</style>