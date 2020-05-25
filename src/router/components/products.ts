import Menu from "@/components/Menu.vue";
import store from "@/store";
import {Route} from "vue-router";

export const products =  {
    path      : '/products',
    name      : 'Products',
    components: {
        default: () => import('@/views/Products/Product.vue'),
        menu   : Menu
    },
    beforeEnter(to: Route, from: Route, next: Function) {
        if (store.state.authentication.token) {
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
            beforeEnter(to: Route, from: Route, next: Function) {
                if (store.state.authentication.token) {
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
                default: () => import('@/views/Products/Create.vue'),
                menu   : Menu
            },
            beforeEnter(to: Route, from: Route, next: Function) {
                if (store.state.authentication.token) {
                    next()
                } else {
                    next("/signin")
                }
            },
        },
        {
            path      : ':id/*',
            name      : 'Show',
            components: {
                default: () => import('@/views/Products/Show.vue'),
                menu   : Menu
            },
            beforeEnter(to: Route, from: Route, next: Function) {
                if (store.state.authentication.token) {
                    next()
                } else {
                    next("/signin")
                }
            },
        },
    ]
}