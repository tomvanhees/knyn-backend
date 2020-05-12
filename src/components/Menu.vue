<template>
    <div>
        <div class="container-fluid menu">
                <div class="row">
                    <div class="col-12 d-flex">
                        <ul class="nav">
                            <li class="nav-item"><router-link tag="a" class="nav-link" active-class="active" to="/inspiratie">Inspiratie</router-link></li>
                            <li class="nav-item"><router-link tag="a" class="nav-link" active-class="active" to="/feedback">Feedback (wip)</router-link></li>
                            <li class="nav-item"><router-link tag="a" class="nav-link" active-class="active" to="/products">Products</router-link></li>
                            <li class="nav-item"><router-link tag="a" class="nav-link" active-class="active" to="/information">Information</router-link></li>
                        </ul>
                        <div class="ml-auto">
<!--                            <router-link tag="a" class="btn btn-dark mr-1" to="/information">Instellingen (wip)</router-link>-->
                            <a class="nav-link" @click="logout">Logout</a>
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