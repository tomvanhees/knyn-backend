import {DeserializableInterface} from "@/interfaces/Deserializable.interface";
import {SerializeInterface} from "@/interfaces/Serialize.interface";

export abstract class Model implements DeserializableInterface, SerializeInterface {

    deserialize(input: any): this {
        Object.assign(this, input)
        return this;
    }

    serialize(): any {
       return  Object.getOwnPropertyNames(this)
            .reduce((object: any, propertyName: string) => {
                if (propertyName != "__ob__"){
                   object[propertyName] = this[propertyName];
               }
                return object;
            }, {})
    }

}
