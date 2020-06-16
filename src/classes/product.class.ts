import {ProductInterface} from "@/interfaces/Product.interface";
import {CategoryInterface} from "@/interfaces/Category.interface";
import {MediaInterface} from "@/interfaces/MediaInterface";
import {BrandModel} from "@/classes/brand/brand.model";
import {BrandInterface} from "@/interfaces/Brand.interface";

export default class ProductClass implements ProductInterface {
    id?: number;
    name = "";
    price = "";
    description = "";
    brand: BrandInterface;
    categories: Array<CategoryInterface> = [];
    media: Array<MediaInterface> = [];

    constructor() {
        this.brand = new BrandModel();
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.brand = new BrandModel().deserialize(input.brand);
        return this;
    }

    serialize(): any {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description,
            brand: this.brand.serialize(),
            categories: this.categories,
            media: this.media
        };
    }
}
