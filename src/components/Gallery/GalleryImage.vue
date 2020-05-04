<template>
    <div class="card m-2" style="width: 300px">
        <img :src="item.path" class="card-img-top" alt="">

        <div class="card-body">
            <div class="card-text">
                {{ item.name}}
            </div>
            <button class="btn btn-primary" @click="removeMedia">Verwijderen</button>
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
            }
        }
    }
</script>

<style scoped>

</style>