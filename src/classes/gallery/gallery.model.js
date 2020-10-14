import {MediaItemClass} from "@/classes/media/mediaItem.class";

export class GalleryModel {
    id = 0;
    name = ""
    cover = "";
    media= [];
    slug = "";

    deserialize(input) {
        this.id = input.id;
        this.name = input.name;
        this.cover = input.cover;
        this.slug = input.slug;
        this.media = input.media.map((mediaItem) => new MediaItemClass().deserialize(mediaItem))

        return this;
    }

    serialize() {
        return {
            name: this.name
        }
    }
}
