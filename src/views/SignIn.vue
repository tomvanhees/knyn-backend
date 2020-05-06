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
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-group">

                                <label for="">Wachtwoord</label> <br>
                                <input type="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-dark">Verzenden</button>
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
    export default {
        name: "SignIn"
    }
</script>

<style scoped>

</style>