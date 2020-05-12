<template>
    <div class="thumb" :class="{'active' : index === active_image}">
        <img :src="image.thumb" alt="" style="max-width: 50px" class="rounded" @click="setActive">
    </div>
</template>

<script>
    export default {
        name   : "Thumb",
        props  : {
            image       : {},
            index       : {},
            active_image: {}
        },
        methods: {
            setActive() {
                this.$emit("set_active", this.index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .thumb {
        padding: 5px;
        border-radius: 8px;
        filter: brightness(50%);
        transition: .5s;

        &:hover {
            filter: brightness(100%);
        }

        &.active{
            background-color: #343a40;
            filter: brightness(100%);
        }


        img {
            width: 50px;
            height: 50px;
            border-radius: 8px;
        }
    }
</style>