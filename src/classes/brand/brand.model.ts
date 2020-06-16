import {BrandInterface} from "@/interfaces/Brand.interface";


export class BrandModel implements BrandInterface{
    id = 0;
    name = "";

    deserialize(input: any): this {
        Object.assign(this, input)
        return this;
    }

    serialize(): any {
        return {
            id: this.id,
            name: this.name
        };
    }
}
