import Menu from "@/components/Menu.vue";
import store from "@/store";
import {Route} from "vue-router";

export const gallery = {
    path       : '/inspiratie',
    name       : 'Gallery',
    components : {
        default: () => import('@/views/Gallery/Gallery.vue'),
        menu   : Menu
    },
    beforeEnter(to: Route, from: Route, next: Function) {
        if (store.getters["authentication/isAuthenticated"]) {
            next()
        } else {
            next("/signin")
        }
    }, children: [
        {
            path      : '',
            name      : 'GalleryIndex',
            components: {
                default: () => import('@/views/Gallery/Index.vue'),
                menu   : Menu
            },
            beforeEnter(to: Route, from: Route, next: Function) {
                if (store.getters["authentication/isAuthenticated"]) {
                    next()
                } else {
                    next("/signin")
                }
            },
        },
        {
            path      : 'create',
            name      : 'GalleryCreate',
            components: {
                default: () => import('@/views/Gallery/Create.vue'),
                menu   : Menu
            },
            beforeEnter(to: Route, from: Route, next: Function) {
                if (store.getters["authentication/isAuthenticated"]) {
                    next()
                } else {
                    next("/signin")
                }
            },
        },
        {
            path      : ':id/*',
            name      : 'GalleryShow',
            components: {
                default:
                    () => import('@/views/Gallery/Show.vue'),
                menu   : Menu
            }
            ,
            beforeEnter(to: Route, from: Route, next: Function) {
                if (store.getters["authentication/isAuthenticated"]) {
                    next()
                } else {
                    next("/signin")
                }
            }
        }
    ]
}
