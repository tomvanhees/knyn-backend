<template>
  <header>
    <div class="yippo-container">
      <div id="yippo-main-menu">
        <div class="logo d-flex">
          KNYN
        </div>
        <nav>
          <ul class="menu-container">
            <li class="menu-item">
              <router-link
                tag="a"
                class="menu-link"
                active-class="active"
                to="/inspiratie"
              >
                <span><font-awesome-icon icon="angle-right" /></span> Inspiratie
              </router-link>
            </li>

            <li class="menu-item">
              <router-link
                tag="a"
                class="menu-link"
                active-class="active"
                to="/feedback"
              >
                <span><font-awesome-icon icon="angle-right" /></span> Feedback
              </router-link>
            </li>
            <li class="menu-item">
              <router-link
                tag="a"
                class="menu-link"
                active-class="active"
                to="/products"
              >
                <span><font-awesome-icon icon="angle-right" /></span> Producten
              </router-link>
            </li>
            <li class="menu-item">
              <router-link
                tag="a"
                class="menu-link"
                active-class="active"
                to="/information"
              >
                <span><font-awesome-icon icon="angle-right" /></span> Informatie
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="ml-auto">
          <div class="menu-container">
            <div class="menu-item">
              <router-link
                tag="a"
                class="menu-link"
                to="/configuration"
              >
                <span><font-awesome-icon icon="cog" /></span> Instellingen (wip)
              </router-link>
            </div>
            <div class="menu-item">
              <a
                class="logout"
                @click="logout"
              >Afmelden</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    logout () {
      this.$store.dispatch('authentication/logout')
      this.$router.push('/signin')
    }
  }
}
</script>

<style scoped>

</style>
