<template>
    <div class="card m-2" style="width: 300px;">
        <router-link :to="`/gallery/${gallery.id}/${gallery.slug}`">
            <img :src="gallery.cover" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{ gallery.name}}</h5>
                <p class="card-text"></p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name : "GalleryIndexCard",
        props: {
            gallery: {
                type    : Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>