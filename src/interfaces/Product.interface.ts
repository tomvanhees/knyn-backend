import {BrandInterface} from "@/interfaces/Brand.interface";
import {CategoryInterface} from "@/interfaces/Category.interface";
import {MediaInterface} from "@/interfaces/MediaInterface";
import {SerializeInterface} from "@/interfaces/Serialize.interface";
import {DeserializableInterface} from "@/interfaces/Deserializable.interface";

export interface ProductInterface extends SerializeInterface, DeserializableInterface{
    id?: number;
    name: string;
    description: string;
    price: string;
    brand: BrandInterface;
    categories: Array<CategoryInterface>;
    media: Array<MediaInterface>;
}
