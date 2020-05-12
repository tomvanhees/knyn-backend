import Vue from 'vue'
import Vuex from 'vuex'

import {authentication} from "./partials/authentication"
import {brands} from "./partials/brands";
import {categories} from "./partials/categories";

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
    categories
  }
})
