import Menu from "@/components/layout/header.vue";

export const feedback = {
    path      : '/feedback',
    components: {
        default: () => import('@/views/Feedback/Feedback.vue'),
        menu   : Menu
    },
    children  : [
        {
            path     : "",
            name     : "FeedbackIndex",
            component: () => import('@/views/Feedback/Questions/Index.vue')
        },
        {
            path     : "create",
            name     : "FeedbackCreate",
            component: () => import('@/views/Feedback/Questions/Create.vue')
        },
        {
            path      : 'answers',
            name      : 'Answers',
            components: {
                default: () => import('@/views/Feedback/Answers/Index.vue'),
            }
        },
    ]
}
