import {SerializeInterface} from "@/interfaces/Serialize.interface";
import {DeserializableInterface} from "@/interfaces/Deserializable.interface";

export interface CategoryInterface extends SerializeInterface, DeserializableInterface {
    id: number;
    name: string;
}
