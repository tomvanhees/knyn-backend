import {CategoryInterface} from "@/classes/category/category.interface";

export class CategoryModel implements CategoryInterface {
    id = 0;
    name = "";

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    serialize(): any {
        return {
            id: this.id,
            name: this.name
        }
    }

}
