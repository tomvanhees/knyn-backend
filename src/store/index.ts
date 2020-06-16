import Vue from 'vue'
import Vuex from 'vuex'

import {authentication} from "@/store/partials/authentication"
import {brands}         from "@/store/partials/brands";
import {categories}     from "@/store/partials/categories";
import {product}        from "@/store/partials/product";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    brands,
    categories,
    product
  }
})
