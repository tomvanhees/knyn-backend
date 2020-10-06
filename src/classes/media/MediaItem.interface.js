import {DeserializableInterface} from "@/interfaces/Deserializable.interface";

export interface MediaItemInterface extends DeserializableInterface{
    id: number;
    name: string;
    path: string;
    order: number;
}
