import {ProductInterface} from "@/classes/product/product.interface";
import {CategoryInterface} from "@/interfaces/Category.interface";
import {MediaInterface} from "@/interfaces/MediaInterface";
import {BrandModel} from "@/classes/brand/brand.model";
import {BrandInterface} from "@/classes/brand/brand.interface";
import {UploadMediaClass} from "@/classes/UploadMedia.class";
import http from "@/http/http";

export default class ProductModel implements ProductInterface {
    id?: number;
    name = "";
    price = "";
    description = "";
    brand: BrandInterface;
    categories: Array<CategoryInterface> = [];
    media: Array<MediaInterface> = [];
    uploadMedia: UploadMediaClass;

    constructor() {
        this.brand = new BrandModel();
        this.uploadMedia = new UploadMediaClass();
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.brand = new BrandModel().deserialize(input.brand);
        return this;
    }

    serialize(): any {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description,
            brand: this.brand.serialize(),
            categories: this.categories,
            media: this.media
        };
    }

    deleteMedia(media: any): void {
        const index = this.media.findIndex((mediaItem: MediaInterface) => mediaItem === media);

        http.post(`/product/${this.id}/media/${media.id}`, {
            "_method": "DELETE"
        }).then(() => {
            this.media.splice(index, 1);
        })
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
        const Promises: Array<Promise<any>> = [];

        this.uploadMedia.getMedia().forEach((file: File) => {

            Promises.push(new Promise<any>((resolve) => {

                const formData = new FormData;
                formData.append("image", file);
                formData.append("_method", "PATCH");

                http.post(`/product/${this.id}/media`, formData)
                    .then(response => {
                        this.media.push(response.data);
                        resolve();
                    })
            }))
        })

        Promise.all(Promises).then(() => {
            this.uploadMedia.clearMedia();
        })
    }
}
