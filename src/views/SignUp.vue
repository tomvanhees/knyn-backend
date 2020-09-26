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
                <label for="">Tenant</label><br>
                <input
                  v-model="data.tenant"
                  type="text"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="">Gebruikersnaam</label><br>
                <input
                  v-model="data.name"
                  type="text"
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="">E-mailadres</label> <br>
                <input
                  v-model="data.email"
                  type="text"
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="">Wachtwoord</label> <br>
                <input
                  v-model="data.password"
                  type="password"
                  class="form-control"
                >
              </div>
              <div>
                <button
                  class="btn btn-dark"
                  @click="subscribe"
                >
                  Verzenden
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import auth from "../http/auth";
import router from "../router";

export default Vue.extend({
  name: "SignUp",
  data() {
    return {
      data: {
        tenant: "",
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    subscribe: function () {
      auth.post("/tenant/store", this.data).then(response => {
        // this.$store.dispatch('authentication/setToken', response.data);
        // localStorage.setItem("token", response.data)
        window.location.replace(response.data.redirect_path);
        // router.replace(response.data.redirect_path);
      })
    }
  }
});
</script>

<style scoped>

</style>
