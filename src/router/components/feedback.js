import Menu from "../../components/Menu";
import store from "../../store";

export const feedback = {
    path      : '/feedback',
    name      : 'Feedback',
    components: {
        default: () => import('../../views/Feedback/Feedback'),
        menu   : Menu
    },
    children  : [
        {
            path     : "",
            name     : "FeedbackIndex",
            component: () => import('../../views/Feedback/Index')
        },
        {
            path     : "create",
            name     : "FeedbackCreate",
            component: () => import('../../views/Feedback/Create')
        },
        {
            path      : 'answers',
            name      : 'Answers',
            components: {
                default: () => import('../../views/Feedback/Answers/Index'),
                menu   : Menu
            }
        },
        {
            path     : ':id',
            name     : "FeedbackShow",
            component: () => import('../../views/Feedback/Show')
        },


    ],
    beforeEnter(to, from, next) {
        if (store.state.authentication.token) {
            next()
        } else {
            next("/signin")
        }
    }
}