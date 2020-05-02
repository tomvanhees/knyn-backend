<template>
    <div>
        <div><label for="">E-mailadres</label> <br>
            <input type="text">
        </div>
        
        <div><label for="">Wachtwoord</label> <br>
            <input type="password">
        </div>
        <div>
            <button>Verzenden</button>
        </div>

        <div>
            <router-link to="/signup">Inschrijven</router-link>
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