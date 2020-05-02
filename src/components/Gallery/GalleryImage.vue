<template>
    <div class="card m-2" style="width: 300px">
        <img :src="item.path" class="card-img-top" alt="">

        <div class="card-body">
            <div class="card-text">
                {{ item.name}}
            </div>
            <button class="btn btn-primary" @click="removeItem">Verwijderen</button>
        </div>
    </div>
</template>

<script>
    import http from "../../http/http";

    export default {
        name   : "GalleryImage",
        props  : {
            item: {
                type    : Object,
                required: true
            }
        },
        methods: {
            removeItem() {
                http.post(`/gallery/${this.$route.params.id}/media/${this.item.id}`, {
                    "_method": 'DELETE'
                }).then()
            }
        }
    }
</script>

<style scoped>

</style>