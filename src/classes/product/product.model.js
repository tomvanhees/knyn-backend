import { BrandModel } from '@/classes/brand/brand.model'
import { CategoryModel } from '@/classes/category/category.model'
import { MediaItemClass } from '@/classes/media/mediaItem.class'

export default class ProductModel {
  id = 0
  name = ''
  description = ''
  price = ''
  cover = ''
  brand = {}
  categories = []
  media = []

  serialize () {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      brand: this.brand.serialize(),
      categories: this.categories.map(category => category.serialize())
    }
  }

  deserialize (input) {
    this.id = input.id
    this.name = input.name
    this.description = input.description
    this.price = input.price
    this.brand = new BrandModel().deserialize(input.brand)
    this.cover = input.cover
    this.categories = input.categories.map((category) => {
      return new CategoryModel().deserialize(category)
    })
    this.media = input.media.map((mediaItem) => {
      return new MediaItemClass().deserialize(mediaItem)
    })

    return this
  }
}
