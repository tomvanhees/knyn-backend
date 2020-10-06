import Menu from "@/components/layout/header.vue";
import store from "@/store/index";

export const products =  {
    path      : '/products',
    components: {
        default: () => import('@/views/Products/Product.vue'),
        menu   : Menu
    },
    beforeEnter(to, from, next) {
        if (store.getters["authentication/isAuthenticated"]) {
            next()
        } else {
            next("/signin")
        }
    },
    children:[
        {
            path      : '',
            name      : 'Index',
            components: {
                default: () => import('@/views/Products/Index.vue'),
                menu   : Menu
            },
            beforeEnter(to, from, next) {
                if (store.getters["authentication/isAuthenticated"]) {
                    next()
                } else {
                    next("/signin")
                }
            },
        },
        {
            path      : 'create',
            name      : 'Create',
            components: {
                default: () => import('@/views/Products/Edit.vue'),
                menu   : Menu
            },
            beforeEnter(to, from, next) {
                if (store.getters["authentication/isAuthenticated"]) {
                    next()
                } else {
                    next("/signin")
                }
            },
        },
        {
            path      : ':id',
            name      : 'Edit',
            components: {
                default: () => import('@/views/Products/Edit.vue'),
                menu   : Menu
            },
            beforeEnter(to, from, next) {
                if (store.getters["authentication/isAuthenticated"]) {
                    next()
                } else {
                    next("/signin")
                }
            },
        },
    ]
}
