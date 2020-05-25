import Menu from "@/components/Menu.vue";
import store from "@/store";
import {Route} from "vue-router";

export const feedback = {
    path      : '/feedback',
    name      : 'Feedback',
    components: {
        default: () => import('@/views/Feedback/Feedback.vue'),
        menu   : Menu
    },
    children  : [
        {
            path     : "",
            name     : "FeedbackIndex",
            component: () => import('@/views/Feedback/Index.vue')
        },
        {
            path     : "create",
            name     : "FeedbackCreate",
            component: () => import('@/views/Feedback/Create.vue')
        },
        {
            path      : 'answers',
            name      : 'Answers',
            components: {
                default: () => import('@/views/Feedback/Answers/Index.vue'),
                menu   : Menu
            }
        },
        {
            path     : ':id',
            name     : "FeedbackShow",
            component: () => import('@/views/Feedback/Show.vue')
        },


    ],
    beforeEnter(to: Route, from: Route, next: Function) {
        if (store.state.authentication.token) {
            next()
        } else {
            next("/signin")
        }
    }
}