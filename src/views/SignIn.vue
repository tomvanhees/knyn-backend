<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-4 offset-4 mt-5">
                    <div class="card">
                        <div class="card-header bg-dark">
                            <span class="text-white">Inloggen</span>
                        </div>

                        <div class="card-body">

                            <div class="form-group">

                                <label for="">E-mailadres</label>
                                <input type="text" class="form-control" v-model="email">

                                <div class="alert alert-danger" v-if="errors.hasOwnProperty('email')">
                                    {{ errors.email[0]}}
                                </div>

                            </div>
                            <div class="form-group">

                                <label for="">Wachtwoord</label> <br>
                                <input type="password" class="form-control" v-model="password">
                                <div class="alert alert-danger" v-if="errors.hasOwnProperty('password')">
                                    {{ errors.password[0]}}
                                </div>
                            </div>



                            <div class="form-group">
                                <button class="btn btn-dark" @click="signIn">Verzenden</button>
                            </div>

                            <div>
                                <router-link to="/signup">Nog geen account?</router-link>
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
        name   : "SignIn",
        data() {
            return {
                email   : "",
                password: "",
                errors:{}
            }
        },
        methods: {
            signIn() {
                auth.post("/user/login", {
                    email   : this.email,
                    password: this.password
                }).then(response => {
                    this.$store.dispatch('authentication/setToken', response.data);
                    localStorage.setItem("token", response.data)
                    router.push("/")
                }).catch(errors => {
                    console.log(errors.response)

                    this.errors = errors.response.data.errors
                })
            }
        }
    }
</script>

<style scoped>

</style>