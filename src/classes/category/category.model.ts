import {CategoryInterface} from "@/classes/category/category.interface";
import {Model} from "@/classes/Model";

export class CategoryModel extends Model implements CategoryInterface {
    id = 0;
    name = "";
}
