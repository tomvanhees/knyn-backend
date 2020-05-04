<template>

    <div class="card m-2" style="width: 300px;">
        <router-link :to="`/products/${product.id}/${product.slug}`">
            <img :src="product.cover" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{ product.name}}</h5>
                <p class="card-text"></p>
            </div>
        </router-link>
    </div>

</template>

<script>
    export default {
        name : "ProductIndexCard",
        props: {
            product: {
                type    : Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>