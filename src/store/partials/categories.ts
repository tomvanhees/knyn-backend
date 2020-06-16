import http from "@/http/http";
import {CategoryInterface} from "@/interfaces/Category.interface";

export const categories = {
    namespaced  : true, state: {
        categories: Array<CategoryInterface>()
    }, mutations: {
        setCategories(state: any, value: Array<CategoryInterface>) {
            state.categories = value
        }, addCategory(state: any, value: CategoryInterface) {
            state.categories.push(value)
        }, deleteCategory(state: any, value: CategoryInterface) {
            const index = state.categories.indexOf(value);
            state.categories.splice(index, 1);
        }
    }, actions  : {
        getCategories    : ({commit}: any) => {
            http.get("product/categories").then(response => {
                commit("setCategories", response.data)
            })
        }, addCategory   : ({commit}: any, value: string) => {
            http.post("/product/categories", {
                "name": value
            }).then(response => {
                commit("addCategory", response.data)

            })
        }, deleteCategory: ({commit}: any, category: CategoryInterface) => {
            http.post(`product/categories/${category.id}`, {
                "_method": "DELETE"
            }).then(() => {
                commit("deleteCategory", category)
            })
        }
    }
}
