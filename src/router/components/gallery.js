import Menu from "@/components/layout/header.vue";
import store from "@/store/index";

export const gallery = {
    path: '/inspiratie',
    components: {
        default: () => import('@/views/Gallery/Gallery.vue'),
        menu: Menu
    },
    beforeEnter(to, from, next) {
        if (store.getters["authentication/isAuthenticated"]) {
            next()
        } else {
            next("/signin")
        }
    }, children: [
        {
            path: '',
            name: 'GalleryIndex',
            components: {
                default: () => import('@/views/Gallery/Index.vue'),
                menu: Menu
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
            path: 'create',
            name: 'GalleryCreate',
            components: {
                default: () => import('@/views/Gallery/Edit.vue'),
                menu: Menu
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
            path: ':id/:name',
            name: 'GalleryEdit',
            components: {
                default:
                    () => import('@/views/Gallery/Edit.vue'),
                menu: Menu
            },
            beforeEnter(to, from, next) {
                if (store.getters["authentication/isAuthenticated"]) {
                    next()
                } else {
                    next("/signin")
                }
            }
        }
    ]
}
