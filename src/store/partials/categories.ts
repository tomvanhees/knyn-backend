import {CategoryInterface} from "@/classes/category/category.interface";
import {CategoryModel} from "@/classes/category/category.model";
import CategoryService from "@/classes/category/category.service";

export const categories = {
    namespaced: true, state: {
        categories: Array<CategoryInterface>()
    }, mutations: {
        setCategories(state: any, categories: Array<CategoryInterface>) {
            categories.forEach(category => state.categories.push(new CategoryModel().deserialize(category)))
        },
        addCategory(state: any, category: CategoryInterface) {
            state.categories.push(new CategoryModel().deserialize(category))
        },
        deleteCategory(state: any, value: CategoryInterface) {
            const index = state.categories.indexOf(value);
            state.categories.splice(index, 1);
        }
    }, actions: {
        getCategories: ({state,commit}: any) => {
            if (state.categories.length === 0){
                CategoryService.fetch()
                    .then(response => {
                        commit("setCategories", response.data)
                    })
            }
        }, addCategory: ({commit}: any, category: CategoryModel) => {
            CategoryService.post(category)
                .then(response => {
                    commit("addCategory", response.data)

                })
        }, deleteCategory: ({commit}: any, category: CategoryModel) => {
            CategoryService.delete(category)
                .then(() => {
                    commit("deleteCategory", category)
                })
        }
    }
}
