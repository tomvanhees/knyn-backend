<template>
    <div>
        <div class="container-fluid bg-dark mb-3">
            <div class="container">
                <div class="row py-3">
                    <div class="col-12 d-flex">
                        <ul class="nav nav-pills">
                            <li class="nav-item"><router-link tag="a" class="nav-link text-white" active-class="active bg-light text-dark" to="/gallery">Gallery</router-link></li>
                            <li class="nav-item"><router-link tag="a" class="nav-link text-white" active-class="active bg-light text-dark" to="/feedback">Feedback (wip)</router-link></li>
                            <li class="nav-item"><router-link tag="a" class="nav-link text-white" active-class="active bg-light text-dark" to="/products">Products</router-link></li>
                            <li class="nav-item"><router-link tag="a" class="nav-link text-white" active-class="active bg-light text-dark" to="/information">Information (wip)</router-link></li>
                        </ul>
                        <div class="ml-auto">
                            <router-link tag="a" class="btn btn-dark mr-1" to="/information">Instellingen (wip)</router-link>
                            <a class="btn btn-danger text-white" @click="logout">Logout</a>
                        </div>
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
                this.$store.dispatch("authentication/logout");
                this.$router.push("/signin")
            }
        }
    }
</script>

<style scoped>

</style>