import http from "@/http/http";
import {GalleryInterface} from "@/interfaces/GalleryInterface";
import {MediaInterface} from "@/interfaces/MediaInterface";


export const gallery = {
    namespaced  : true, state: {
        gallery: {} as GalleryInterface

    }, getters  : {
        getGallery(state: any) {
            return state.gallery;
        }
    }, mutations: {
        setGallery(state: any, gallery: GalleryInterface) {
            state.gallery = gallery
        }, addMedia(state: any, media: MediaInterface) {
            state.gallery.media.push(media);
        }, removeMedia(state: any, index: number) {
            state.gallery.media.splice(index, 1);
        }
    }, actions  : {
        async fetchGallery({commit}: any, id: number): Promise<any> {
            return http.get(`/gallery/${id}`).then(response => {
                commit('setGallery', response.data)
            })

        }, async updateGallery({state}: any): Promise<any> {
            return http.post(`/gallery/${state.gallery.id}`, {
                "name": state.gallery.name, "_method": "PATCH"
            });

        }, async deleteGallery({state}: any): Promise<any> {
            return http.post(`/gallery/${state.gallery.id}`, {
                "_method": "DELETE"
            });
        },
        async uploadMedia({state, commit}: any, media: any): Promise<any> {
            const formData = new FormData;
            formData.append(`image`, media)
            formData.append("_method", "PATCH");

           return http.post(`/gallery/${state.gallery.id}/media`, formData)
                             .then((response) => {
                                 commit("addMedia", response.data)
                             });
        },
        async removeMedia({state, commit}: any, media: MediaInterface): Promise<any> {
            const index = state.gallery.media.findIndex((mediaItem: MediaInterface) => mediaItem === media);

            http.post(`/gallery/${state.gallery.id}/media/${media.id}`, {
                "_method": 'DELETE'
            }).then(() => {
                commit("removeMedia", index);
            })

            return;
        }
    }
}