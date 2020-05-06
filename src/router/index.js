import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import store from "../store/index";
import Menu from "../components/Menu";
import {products} from "./components/products"
import {gallery} from "./components/gallery"

Vue.use(VueRouter)

const routes = [
    products,
    gallery,
    {
        path     : '/signin',
        name     : 'SignIn',
        component: SignIn
    }, {
        path     : '/signup',
        name     : 'SignUp',
        component: SignUp
    },
    {
        path      : '/',
        name      : 'Home',
        components: {
            default: Home,
            menu   : Menu
        },
        beforeEnter(to, from, next) {
            if (store.state.authentication.token) {
                next()
            } else {
                next("/signin")
            }

        }
    },
    {
        path      : '/feedback',
        name      : 'Feedback',
        components: {
            default: () => import('../views/Feedback/Feedback'),
            menu   : Menu
        },
        beforeEnter(to, from, next) {
            if (store.state.authentication.token) {
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
            default: () => import('../views/Information/Show'),
            menu   : Menu
        },
        beforeEnter(to, from, next) {
            if (store.state.authentication.token) {
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
    if (!store.state.authentication.token){
        store.dispatch("authentication/tryAutologin")
    }
    next()
})

export default router
