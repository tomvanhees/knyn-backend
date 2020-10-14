import { CategoryModel } from '@/classes/category/category.model'
import CategoryService from '@/classes/category/category.service'

export const categories = {
  namespaced: true, state: {
    categories: []
  },
  getters: {
    getCategories (state) {
      return state.categories
    }
  },
  mutations: {
    set (state, categories) {
      categories.forEach(category => state.categories.push(new CategoryModel().deserialize(category)))
    },
    add (state, category) {
      state.categories.push(category)
    },
    delete (state, value) {
      const index = state.categories.indexOf(value)
      state.categories.splice(index, 1)
    }
  }, actions: {
    getCategories: async ({ state, commit }) => {
      if (state.categories.length === 0) {
        const respons = await CategoryService.fetch()
        const collection = await CategoryService.deserializeCollection(respons)
        commit('set', collection)
      }
    }, addCategory: async ({ commit }, category) => {
      const response = await CategoryService.post(category)
      const categoryModel =  CategoryService.deserialize(response.data.content)
      commit('add', categoryModel)

    }, deleteCategory: ({ commit }, category) => {
      CategoryService.delete(category)
        .then(() => {
          commit('delete', category)
        })
    }
  }
}
