import {ProductInterface} from "@/interfaces/ProductInterface";
import {BrandInterface} from "@/interfaces/BrandInterface";
import {CategoryInterface} from "@/interfaces/CategoryInterface";
import {MediaInterface} from "@/interfaces/MediaInterface";
import {BrandClass} from "@/classes/brand.class";
import {DeserializableInterface} from "@/interfaces/Deserializable.interface";

export default class ProductClass implements ProductInterface, DeserializableInterface {
    id?: number;
    name = "";
    price = "";
    description = "";
    brand: BrandInterface = new BrandClass();
    categories: Array<CategoryInterface> = [];
    media: Array<MediaInterface> = [];

    deserialize(input: any): this {
        Object.assign(this, input);
        this.brand = new BrandClass().deserialize(input.brand);
        return this;
    }
}
