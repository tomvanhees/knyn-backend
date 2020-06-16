import http from "@/http/http";
import {BrandModel} from "@/classes/brand/brand.model";

export default class BrandService {
    static fetch(): Promise<any> {
        return http.get("product/brands")
    }

    static post(brand: BrandModel): Promise<any> {
        return http.post("/product/brands", {
                content: brand.serialize()
            }
        )
    }

    static delete(brand: BrandModel): Promise<any> {
        return http.post(`product/brands/${brand.id}`, {
            "_method": "DELETE"
        })
    }
}
