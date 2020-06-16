import {MediaInterface} from "@/interfaces/MediaInterface";
import http from "@/http/http";
import {UploadMediaInterface} from "@/classes/UploadMedia.class";
import {ProductInterface} from "@/interfaces/Product.interface";
import ProductModel from "@/classes/product/product.model";

export const product = {
    namespaced: true,
    state: {
        products: [] as Array<ProductModel>,
        product: {} as ProductModel
    },
    getters: {
        getProduct(state: any): ProductModel {
            return state.product;
        },
        getProducts(state: any): Array<ProductModel> {
            return state.products;
        }
    },
    mutations: {
        setProducts(state: any, products: Array<ProductModel>): void {
            state.products = products;
        },
        setProduct(state: any, product: ProductModel): void {
            state.product = product
        },
        addMedia(state: any, media: MediaInterface): void {
            state.product.media.push(media);
        },
        removeMedia(state: any, index: number): void {
            state.product.media.splice(index, 1);
        }
    },
    actions: {
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
        async updateProduct({state}: any, data: ProductModel): Promise<any> {
            return http.post(`/product/${state.product.id}`, {
                data: data.serialize(),
                _method: 'PATCH'
            })
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
