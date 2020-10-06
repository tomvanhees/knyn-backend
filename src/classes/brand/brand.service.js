import http from '@/http/http'
import { BrandModel } from '@/classes/brand/brand.model'

export default class BrandService {
  static async fetch () {
    return http.get('product/brands')
  }

  static deserializeCollection (response) {
    if (Array.isArray(response.data.content.collection)) {
      return response.data.content.collection.map((brand) => BrandService.deserialize(brand))
    }
  }

  static deserialize (brand) {
    return new BrandModel().deserialize(brand)

  }

  static post (brand) {
    return http.post('/product/brands', {
        content: brand.serialize()
      }
    )
  }

  static delete (brand) {
    return http.post(`product/brands/${brand.id}`, {
      '_method': 'DELETE'
    })
  }
}
