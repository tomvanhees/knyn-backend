import {BrandInterface} from "@/classes/brand/Brand.interface";
import {Model} from "@/classes/Model";

export class BrandModel extends Model implements BrandInterface{
    id = 0;
    name = "";
}
