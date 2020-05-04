<template>
    <div>
        <div class="container">
            <div class="row mb-2 mt-2">
                <div class="col-12 d-flex">
                    <div>
                        <router-link tag="a" class="btn btn-dark mr-1" to="/gallery">Gallery</router-link>
                        <router-link tag="a" class="btn btn-dark mr-1" to="/feedback">feedback</router-link>
                        <router-link tag="a" class="btn btn-dark mr-1" to="/products">products</router-link>
                        <router-link tag="a" class="btn btn-dark mr-1" to="/information">information</router-link>
                    </div>
                    <div class="ml-auto">
                        <a class="btn btn-danger text-white" @click="logout">Logout</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        methods:{
            logout(){
                this.$store.dispatch("authentication/clearToken");
                this.$router.push("/login")
            }
        }
    }
</script>

<style scoped>

</style>