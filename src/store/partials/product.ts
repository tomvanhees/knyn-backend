import {MediaInterface}       from "@/interfaces/MediaInterface";
import http                   from "@/http/http";
import {UploadMediaInterface} from "@/classes/UploadMedia";
import {ProductInterface}     from "@/interfaces/ProductInterface";

export const product = {
    namespaced: true,
    state     : {
        products: [] as Array<ProductInterface>,
        product : {} as ProductInterface
    },
    getters   : {
        getProduct(state: any) {
            return state.product;
        },
        getProducts(state: any) {
            return state.products;
        }
    },
    mutations : {
        setProducts(state: any, products: Array<ProductInterface>) {
            state.products = products;
        },
        setProduct(state: any, product: ProductInterface) {
            state.product = product
        },
        addMedia(state: any, media: MediaInterface) {
            state.product.media.push(media);
        },
        removeMedia(state: any, index: number) {
            state.product.media.splice(index, 1);
        }
    },
    actions   : {
        async fetchProducts({commit}: any): Promise<any> {
            http.get("/product").then(response => {
                commit("setProducts", response.data);
            })
        },
        async fetchProduct({commit}: any, id: number): Promise<any> {
            return http.get(`/product/${id}`).then(response => {
                commit('setProduct', response.data);
            })
        }, // async createProduct({commit}: any, data: { name: string }): Promise<any> {
        //
        // },
        async updateProduct({state}: any, data: { "name": string; "description": string; "price": string; "brand_id": number; "categories": Array<number>; "_method": string }): Promise<any> {
            return http.post(`/product/${state.product.id}`, data)
        },
        async deleteProduct({state}: any): Promise<any> {
            return http.post(`/product/${state.product.id}`, {
                "_method": "DELETE"
            })
        },
        clearProduct({commit}: any): void {
            commit("setProduct", {});
        },
        async uploadMedia({state, commit}: any, mediaCollection: UploadMediaInterface): Promise<any> {
            mediaCollection.getMedia().forEach((file: File) => {
                const formData = new FormData;
                formData.append("image", file);
                formData.append("_method", "PATCH");

                http.post(`/product/${state.product.id}/media`, formData).then(response => {
                    commit("addMedia", response.data);
                });
            })
        },
        async removeMedia({state, commit}: any, media: MediaInterface): Promise<any> {
            const index = state.product.media.findIndex((mediaItem: MediaInterface) => mediaItem === media);


            return http.post(`/product/${state.product.id}/media/${media.id}`, {
                "_method": "DELETE"
            }).then(() => {
                commit("removeMedia", index);
            })
        }
    }

}