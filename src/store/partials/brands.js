import BrandService from '@/classes/brand/brand.service'

export const brands = {
  namespaced: true,
  state: {
    brands: []
  },
  getters: {
    getBrands (state) {
      return state.brands
    }
  },
  mutations: {
    set (state, brands) {
      brands.forEach(brand => state.brands.push(brand))
    },
    add(state, brand) {
      state.brands.push(brand)
    },
    delete (state, value) {
      const index = state.brands.indexOf(value)
      state.brands.splice(index, 1)
    }
  },
  actions: {
    getBrands: async ({ state, commit }) => {
      if (state.brands.length === 0) {
        const response = await BrandService.fetch()
        const collection = BrandService.deserializeCollection(response)
        commit('set', collection)
      }
    },
    addBrand: async ({ commit }, brand) => {

      const response = await BrandService.post(brand)
      const deserializedBrand = BrandService.deserialize(response.data.content)
      commit('add', deserializedBrand)
    },
    deleteBrand: ({ commit }, brand) => {
      BrandService.delete(brand)
        .then(() => {
          commit('delete', brand)
        })
    }
  }
}
