import http from '@/http/http'
import ProductModel from '@/classes/product/product.model'

export default class ProductService {
  /**
   * @param page {Number}
   * @param brands {BrandModel[]}
   * @param categories {CategoryModel[]}
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

  /**
   * @param id {Number}
   * @return {Promise<AxiosResponse<any>>}
   */
  static async find (id) {
    return http.get(`/product/${id}`)
  }

  /**
   * @param product {ProductModel}
   * @return {Promise<AxiosResponse<any>>}
   */
  static async create (product) {
    return http.post(`/product`, {
      content: product.serialize()
    })
  }

  /**
   * @param product {ProductModel}
   * @return {Promise<AxiosResponse<any>>}
   */
  static async update (product) {
    return http.post(`/product/${product.id}`, {
      content: product.serialize(),
      '_method': 'PATCH'
    })
  }

  /**
   * @param product {ProductModel}
   * @return {Promise<AxiosResponse<any>>}
   */
  static async delete (product) {
    return http.post(`/product/${product.id}`, {
      '_method': 'DELETE'
    })
  }

  /**
   * @param brands {BrandModel[]}
   * @return {*[]|*}
   */
  static getBrandId (brands) {
    if (brands.length === 0) {
      return []
    }

    return brands.map(brand => brand.id)
  }

  /**
   * @param categories {CategoryModel[]}
   * @return {*[]|*}
   */
  static getCategoriesId (categories) {
    if (categories.length === 0) {
      return []
    }
    return categories.map(category => category.id)
  }
}
