import http from "@/http/http";


export default class GalleryService {

    /**
     * @return {Promise<AxiosResponse<any>>}
     */
    static async fetch() {
        return http.get("/gallery")
    }

    /**
     *
     * @param id {number}
     * @return {Promise<AxiosResponse<any>>}
     */
    static async find(id){
        return http.get(`/gallery/${id}`);
    }

    /**
     *
     * @param gallery {GalleryModel}
     * @return {Promise<AxiosResponse<any>>}
     */
    static async create(gallery) {
        return http.post(`/gallery`, {
                content: gallery.serialize()
            }
        )
    }

    /**
     *
     * @param gallery {GalleryModel}
     * @return {Promise<AxiosResponse<any>>}
     */
    static async update(gallery) {
        return http.post(`/gallery/${gallery.id}`, {
            content: gallery.serialize(),
            "_method": "PATCH"
        })
    }

    /**
     *
     * @param gallery {GalleryModel}
     * @return {Promise<AxiosResponse<any>>}
     */
    static async delete(gallery) {
        return http.post(`/gallery/${gallery.id}`, {
            "_method": "DELETE"
        });
    }
}
