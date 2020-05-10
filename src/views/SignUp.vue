<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-4 offset-4 mt-5">
                    <div class="card">
                        <div class="card-header bg-dark">
                            <span class="text-white">Inschrijven</span>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="">Gebruikersnaam</label><br>
                                <input type="text" class="form-control" v-model="data.name">
                            </div>

                            <div class="form-group"><label for="">E-mailadres</label> <br>
                                <input type="text" class="form-control" v-model="data.email">
                            </div>

                            <div class="form-group"><label for="">Wachtwoord</label> <br>
                                <input type="password" class="form-control" v-model="data.password">
                            </div>
                            <div>
                                <button class="btn btn-dark" @click="subscribe">Verzenden</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from "../http/auth";
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
                auth.post("/user/store", this.data).then(response => {
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