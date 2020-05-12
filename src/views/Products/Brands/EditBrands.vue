<template>
    <div>
        <div class="btn btn-sm btn-dark">Bewerken</div>


        <div class="cover">
            <div class="card">
                <div class="card-header">
                    <div class="card-header-text">
                        Merken
                    </div>
                </div>
                <ul class="list-group">
                    <li class="list-group-item" :key="brand.id" v-for="brand in Brands"> {{ brand.name}}</li>
                </ul>
                <div class="card-body">
                    <div class="form-group">
                        <div class="input-group">
                            <input type="text" class="form-control">
                            <div class="input-group-append">
                                <button class="btn btn-dark">Toevoegen</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>

<script>
    import {BrandMixin} from "../../../mixins/BrandMixin";

    export default {
        name  : "EditBrands",
        mixins: [
            BrandMixin
        ]

    }
</script>

<style lang="scss" scoped>
    .cover {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .7);
        z-index: 15;
    }

    .card {
        min-width: 500px;
        width: 50%;
        max-width: 600px;

        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%);
    }

</style>