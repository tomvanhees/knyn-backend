import {BrandInterface} from "@/interfaces/BrandInterface";
import {DeserializableInterface} from "@/interfaces/Deserializable.interface";

export class BrandClass implements BrandInterface, DeserializableInterface {
    id = 0;
    name = "";

    deserialize(input: any): this {
        Object.assign(this, input)
        return this;
    }
}
