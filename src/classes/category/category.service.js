import http from '@/http/http'
import { CategoryModel } from '@/classes/category/category.model'

export default class CategoryService {
  static async fetch () {
    return http.get('product/categories')
  }

  static async deserializeCollection (response) {
    if (Array.isArray(response.data.content.collection)) {
      return response.data.content.collection.map((category) => CategoryService.deserialize(category))
    }
  }

  static deserialize (category) {
    return new CategoryModel().deserialize(category)
  }

  static async post (category) {
    return http.post('/product/categories', {
      content: category.serialize()
    })
  }

  static async delete (category) {
    return http.post(`product/categories/${category.id}`, {
      '_method': 'DELETE'
    })
  }
}
