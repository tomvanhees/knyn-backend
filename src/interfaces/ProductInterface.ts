import {BrandInterface} from "@/interfaces/BrandInterface";
import {CategoryInterface} from "@/interfaces/CategoryInterface";
import {MediaInterface} from "@/interfaces/MediaInterface";

export interface ProductInterface {
    id?: number;
    name: string;
    description: string;
    price: string;
    brand: BrandInterface;
    categories: Array<CategoryInterface>;
    media: Array<MediaInterface>;
}
