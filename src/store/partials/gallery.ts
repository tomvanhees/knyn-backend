import http                   from "@/http/http";
import {GalleryInterface}     from "@/interfaces/GalleryInterface";
import {MediaInterface}       from "@/interfaces/MediaInterface";
import {UploadMediaInterface} from "@/classes/UploadMedia";


export const gallery = {
    namespaced: true,
    state     : {
        galleries: [] as Array<GalleryInterface>,
        gallery  : {} as GalleryInterface
    },
    getters   : {
        getGallery(state: any) {
            return state.gallery;
        },
        getGalleries(state: any) {
            return state.galleries
        }
    },
    mutations : {
        setGalleries(state: any, galleries: Array<GalleryInterface>) {
            state.galleries = galleries;
        },
        setGallery(state: any, gallery: GalleryInterface) {
            state.gallery = gallery
        },
        addMedia(state: any, media: MediaInterface) {
            state.gallery.media.push(media);
        },
        removeMedia(state: any, index: number) {
            state.gallery.media.splice(index, 1);
        }
    },
    actions   : {
        async fetchGalleries({commit}: any): Promise<any> {
            http.get("/gallery")
                .then(response => {
                    commit("setGalleries", response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async fetchGallery({commit}: any, id: number): Promise<any> {
            return http.get(`/gallery/${id}`).then(response => {
                commit('setGallery', response.data)
            })
        },
        async createGallery({commit}: any, data: { name: string }): Promise<any> {
            return http.post(`/gallery`, data)
                       .then(response => {
                           commit("setGallery", response.data)
                       })
                       .catch(errors => {
                           console.log(errors)
                       })
        },
        async updateGallery({state}: any): Promise<any> {
            return http.post(`/gallery/${state.gallery.id}`, {
                "name"   : state.gallery.name,
                "_method": "PATCH"
            });

        },
        async deleteGallery({state}: any): Promise<any> {
            return http.post(`/gallery/${state.gallery.id}`, {
                "_method": "DELETE"
            });
        },
        clearGallery({commit}: any): void{
          commit("setGallery", {});
        },
        async uploadMedia({state, commit}: any, mediaCollection: UploadMediaInterface): Promise<any> {
            mediaCollection.getMedia().forEach((file: File) => {
                const formData = new FormData;
                formData.append(`image`, file)
                formData.append("_method", "PATCH");

                return http.post(`/gallery/${state.gallery.id}/media`, formData)
                           .then((response) => {
                               commit("addMedia", response.data)
                           });
            })
        },
        async removeMedia({state, commit}: any, media: MediaInterface): Promise<any> {
            const index = state.gallery.media.findIndex((mediaItem: MediaInterface) => mediaItem === media);

            http.post(`/gallery/${state.gallery.id}/media/${media.id}`, {
                "_method": 'DELETE'
            })
                .then(() => {
                    commit("removeMedia", index);
                })

            return;
        }
    }
}