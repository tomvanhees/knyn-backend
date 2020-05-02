<template>
    <div>
        <div>
            <label for="">Gebruikersnaam</label><br>
            <input type="text" v-model="data.name">
        </div>

        <div><label for="">E-mailadres</label> <br>
            <input type="text" v-model="data.email">
        </div>

        <div><label for="">Wachtwoord</label> <br>
            <input type="password" v-model="data.password">
        </div>

        <div>
            <button @click="subscribe">Verzenden</button>
        </div>
    </div>
</template>

<script>
    import http from "../http/http";
    import router from "../router";

    export default {
        name   : "SignUp",
        data() {
            return {
                data: {
                    name       : "",
                    email      : "",
                    password   : ""
                }
            }
        },
        methods: {
            subscribe: function () {
                http.post("/user/store", this.data).then(response => {
                    this.$store.dispatch('authentication/setToken',response.data);
                    localStorage.setItem("token", response.data)
                    router.push("/")
                    })
            }
        }
    }
</script>

<style scoped>

</style>