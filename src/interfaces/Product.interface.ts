import {BrandInterface} from "@/interfaces/Brand.interface";
import {CategoryInterface} from "@/interfaces/Category.interface";
import {MediaInterface} from "@/interfaces/MediaInterface";
import {SerializeInterface} from "@/interfaces/Serialize.interface";
import {DeserializableInterface} from "@/interfaces/Deserializable.interface";
import {HasMediaInterface} from "@/interfaces/HasMedia.interface";

export interface ProductInterface extends SerializeInterface, DeserializableInterface, HasMediaInterface{
    id?: number;
    name: string;
    description: string;
    price: string;
    brand: BrandInterface;
    categories: Array<CategoryInterface>;
    media: Array<MediaInterface>;
}
