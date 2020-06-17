import {MediaInterface} from "@/interfaces/MediaInterface";
import {DeserializableInterface} from "@/interfaces/Deserializable.interface";
import {SerializeInterface} from "@/interfaces/Serialize.interface";
import {HasMediaInterface} from "@/interfaces/HasMedia.interface";

export interface GalleryInterface extends DeserializableInterface, SerializeInterface, HasMediaInterface{
    id: number;
    cover: string;
    name: string;
    slug: string;
    media: Array<MediaInterface>;
}
