import http from "@/http/http";
import {CategoryModel} from "@/classes/category/category.model";

export default class CategoryService {
    static fetch(): Promise<any> {
        return http.get("product/categories")
    }

    static post(category: CategoryModel): Promise<any> {
        return http.post("/product/categories", {
            content: category.serialize()
        })
    }

    static delete(category: CategoryModel): Promise<any> {
        return http.post(`product/categories/${category.id}`, {
            "_method": "DELETE"
        })
    }
}
