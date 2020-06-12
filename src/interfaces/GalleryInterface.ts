import {MediaInterface} from "@/interfaces/MediaInterface";

export interface GalleryInterface {
    id: number;
    cover: string;
    name: string;
    slug: string;
    media: Array<MediaInterface>;
}