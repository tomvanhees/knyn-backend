import http from "@/http/http";
import {GalleryModel} from "@/classes/gallery/gallery.model";

export default class GalleryService {
    static async fetch(): Promise<any> {
        return http.get("/gallery")
    }

    static async find(id: number|string): Promise<any> {
        return http.get(`/gallery/${id}`);
    }

    static async create(gallery: GalleryModel): Promise<any> {
        return http.post(`/gallery`, {
            content: gallery.serialize()
        })
    }

    static async update(gallery: GalleryModel): Promise<any> {
        return http.post(`/gallery/${gallery.id}`, {
            content: gallery.serialize(),
            "_method": "PATCH"
        })
    }

    static async delete(gallery: GalleryModel): Promise<any> {
        return http.post(`/gallery/${gallery.id}`, {
            "_method": "DELETE"
        });
    }
}
