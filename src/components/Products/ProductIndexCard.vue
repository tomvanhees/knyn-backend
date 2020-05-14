<template>
    <div class="card m-2" style="width: 380px;">
        <router-link :to="`/products/${product.id}/${product.slug}`" style="text-decoration: none">
            <div class="d-flex">
                <div>
                    <img :src="product.cover" class="m-3" alt="" style="border-radius: 50%; width: 100px; height: 100px">
                </div>


                <div class="card-body d-flex flex-column">
                    <div>
                        <div class="product-title">{{ product.name}}</div>
                        <div class="product-brand">{{ product.brand.name}}</div>
                    </div>
                    <div class="product-price">{{ product.price}}</div>
                </div>
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