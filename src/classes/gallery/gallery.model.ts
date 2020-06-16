import {GalleryInterface} from "@/interfaces/Gallery.interface";
import {MediaInterface} from "@/interfaces/MediaInterface";
import {UploadMediaClass} from "@/classes/UploadMedia.class";
import http from "@/http/http";

export class GalleryModel implements GalleryInterface {
    name = ""
    cover = "";
    id = 0;
    media: Array<MediaInterface> = [];
    slug = "";
    uploadMedia: UploadMediaClass

    constructor() {
        this.uploadMedia = new UploadMediaClass();
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    serialize(): any {
        return {
            id: this.id,
            name: this.name,
            cover: this.cover,
            slug: this.slug,
            media: this.media
        }
    }

    onChangeEvent(event: Event): void {
        this.uploadMedia.onChangeEvent(event)
        this.storeMedia();
    }

    onDroppedEvent(event: Event): void {
        this.uploadMedia.onDroppedEvent(event)
        this.storeMedia();
    }

    storeMedia(): void {
        const Promises: Array<any> = [];

        this.uploadMedia.getMedia()
            .forEach(file => {
            Promises.push(new Promise((resolve => {
                const formData = new FormData;
                formData.append(`image`, file)
                formData.append("_method", "PATCH");

                http.post(`/gallery/${this.id}/media`, formData)
                    .then((response) => {
                        this.media.push(response.data)
                        resolve();
                    });
            })))
        })

        Promise.all(Promises).then(() => {
            this.uploadMedia.clearMedia()
        })
    }

    deleteMedia(media: any): void {
        const index = this.media.findIndex((mediaItem: MediaInterface) => mediaItem === media);

        http.post(`/gallery/${this.id}/media/${media.id}`, {
            "_method": 'DELETE'
        })
            .then(() => {
                this.media.splice(index, 1);
            })
    }
}
