<template>
    <div class="col-3 ">
        <div class="mb-4  position-relative">
            <div class="card border-0">
                <router-link :to="`/gallery/${gallery.id}/${gallery.slug}`">
                    <img :src="gallery.cover" class="gallery-image" style="background-position: center center; background-size: cover" alt="" >
                </router-link>
            </div>
            <div class="position-absolute w-100" style="bottom: 50%">
                <router-link :to="`/gallery/${gallery.id}/${gallery.slug}`">
                    <h5 class="card-title text-center">{{ gallery.name}}</h5>
                </router-link>
            </div>
        </div>
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
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    .card {
        width: 250px;
        height: 250px;
        background: rgba(255, 255, 255, .1);
        filter: blur(1px) brightness(50%);
        transition: .5s;

        &:hover {
            filter: blur(0);
        }

    }

    .card-title {
        color: white;


    }
</style>