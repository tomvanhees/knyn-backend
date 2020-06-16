import http from "@/http/http";
import ProductModel from "@/classes/product/product.model";

export default class ProductService {
    static async fetch(): Promise<any> {
        return http.get("/product")
    }

    static async find(id: number|string): Promise<any> {
        return http.get(`/product/${id}`);
    }

    static async create(product: ProductModel): Promise<any> {
        return http.post(`/product`, {
            content: product.serialize()
        })
    }

    static async update(product: ProductModel): Promise<any> {
        return http.post(`/product/${product.id}`, {
            content: product.serialize(),
            "_method": "PATCH"
        })
    }

    static async delete(product: ProductModel): Promise<any> {
        return http.post(`/product/${product.id}`, {
            "_method": "DELETE"
        });
    }
}
