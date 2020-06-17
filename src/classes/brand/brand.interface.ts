import {SerializeInterface} from "@/interfaces/Serialize.interface";
import {DeserializableInterface} from "@/interfaces/Deserializable.interface";

export interface BrandInterface extends SerializeInterface, DeserializableInterface{
    id: number;
    name: string;
}
