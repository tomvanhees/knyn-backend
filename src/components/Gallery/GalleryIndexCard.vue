<template>
    <div class="col-3 ">
        <div class="mb-4  position-relative">
            <router-link :to="`/inspiratie/${gallery.id}/${gallery.slug}`">
                <div class="card border-0">
                    <img :src="gallery.cover" class="gallery-image" style="background-position: center center; background-size: cover" alt="">
                </div>
            </router-link>

            <div class="position-absolute w-100" style="bottom: 50%">
                <router-link :to="`/inspiratie/${gallery.id}/${gallery.slug}`">
                    <h5 class="card-title text-center">{{ gallery.name}}</h5>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name   : "GalleryIndexCard",
        props  : {
            gallery: {
                type    : Object,
                required: true
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .card {
        width: 250px;
        height: 250px;
        background: rgba(52, 58, 64, 1);
        filter: blur(1px) brightness(50%);
        transition: .5s;
        border-radius: 25px;

        img {
            border-radius: 25px;
        }

        &:hover {
            filter: blur(0);
        }

    }

    .card-title {
        color: white;


    }
</style>