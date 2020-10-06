import Vue from 'vue'
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue'
import SignIn from "@/views/SignIn.vue";
import store from "@/store/index";
import Menu from "@/components/layout/header.vue";
import {products} from "./components/products"
import {gallery} from "./components/gallery"
import {feedback} from "./components/feedback";

Vue.use(VueRouter)

const routes = [
    products,
    gallery,
    feedback,
    {
        path     : '/signin',
        name     : 'SignIn',
        component: SignIn
    },
    {
        path      : '/',
        name      : 'Home',
        components: {
            default: Home,
            menu   : Menu
        },
        beforeEnter(to, from, next) {
            if (store.getters["authentication/isAuthenticated"]) {
                next()
            } else {
                next("/signin")
            }

        }
    },
    {
        path      : '/information',
        name      : 'Information',
        components: {
            default: () => import('@/views/Information/Show.vue'),
            menu   : Menu
        },
        beforeEnter(to, from, next) {
            if (store.getters["authentication/isAuthenticated"]) {
                next()
            } else {
                next("/signin")
            }
        }
    },
    {
        path      : '/statistics',
        name      : 'Statistics',
        components: {
            default: () => import('@/views/Statistics/Index.vue'),
            menu   : Menu
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

const router = new VueRouter({
    routes
})

router.beforeEach((to,from,next) =>{
    if (!store.getters["authentication/isAuthenticated"]){
        store.dispatch("authentication/tryAutologin")
    }
    next()
})

export default router
