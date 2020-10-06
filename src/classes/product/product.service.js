import http from '@/http/http'
import ProductModel from '@/classes/product/product.model'

export default class ProductService {
  /**
   * @param page {number}
   * @param brands {array}
   * @param categories {array}
   * @return {Promise<AxiosResponse<any>>}
   */
  static async fetch (page, brands, categories) {
    brands = this.getBrandId(brands)
    categories = this.getCategoriesId(categories)

    return http.get(`/product?page=${page}&brands=${brands}&categories=${categories}`)
  }

  static deserialize (response) {
    const products = []
    response.data.content.collection.forEach((product) => products.push(new ProductModel().deserialize(product)))
    return products
  }

  static async find (id) {
    return http.get(`/product/${id}`)
  }

  static async create (product) {
    return http.post(`/product`, {
      content: product.serialize()
    })
  }

  static async update (product) {
    return http.post(`/product/${product.id}`, {
      content: product.serialize(),
      '_method': 'PATCH'
    })
  }

  static async delete (product) {
    return http.post(`/product/${product.id}`, {
      '_method': 'DELETE'
    })
  }

  static getBrandId (brands) {
    if (brands.length === 0) {
      return []
    }

    return brands.map(brand => brand.id)
  }

  static getCategoriesId (categories) {
    if (categories.length === 0) {
      return []
    }
    return categories.map(category => category.id)
  }
}
