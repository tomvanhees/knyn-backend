<template>
    <div class="card m-2" style="width: 250px">
        <div class="position-relative">
            <img :src="item.path" class="card-img-top" alt="" @error="imageUrlAlt">

            <div class="position-absolute" style="top:0; right: 0;">
                <button class="btn btn-outline-delete btn-sm" @click="removeMedia">
                    <span>x</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name   : "GalleryImage",
        props  : {
            item: {
                type    : Object,
                required: true
            }
        },
        methods: {
            removeMedia() {
               this.$emit("remove-media", this.item)
            },
            imageUrlAlt(event) {
                event.target.src = "https://picsum.photos/250/250"
            }
        }
    }
</script>

<style scoped>

</style>