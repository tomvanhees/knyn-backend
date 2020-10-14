<template>
  <div>
    <div class="yippo-container">
      <div id="login-form">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title">
              Welkom terug bij Yippo!
            </div>
            <div class="card-header-subtitle">
              Log in om verder te gaan
            </div>
          </div>

          <div class="card-body">
            <div class="mt-40">
              <div class="form-group">
                <label for="">E-mailadres</label>
                <input
                  v-model="email"
                  type="text"
                  class="form-control"
                >

                <div
                  v-if="errors.hasOwnProperty('email')"
                  class="alert alert-danger"
                >
                  {{ errors.email[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="">Wachtwoord</label> <br>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                >
                <div
                  v-if="errors.hasOwnProperty('password')"
                  class="alert alert-danger"
                >
                  {{ errors.password[0] }}
                </div>
              </div>


              <div class="form-group mt-30">
                <button
                  class="btn btn-primary btn-block"
                  @click="signIn"
                >
                  Aanmelden
                </button>
                <error-message />
              </div>
              <div />

              <!--              <router-link to="/signup">-->
              <!--                Nog geen account?-->
              <!--              </router-link>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/http/auth";
import router from "../router";
import ErrorMessage from "@/components/layout/ErrorMessage.vue"

export default {
  name: "SignIn",
  components: {
    ErrorMessage
  },
  data() {
    return {
      email: "",
      password: "",
      errors: {}
    }
  },
  methods: {
    signIn() {
      auth.post("/user/login", {
        email: this.email,
        password: this.password
      })
          .then(response => {

            this.$store.dispatch('authentication/setToken', response.data.token);
            localStorage.setItem("token", response.data.token)
            router.push("/")
          }).catch(errors => {
        console.log(errors)
      })
    }
  }
}
</script>
