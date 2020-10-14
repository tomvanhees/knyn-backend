import Menu from "@/components/layout/header.vue";

export const products =  {
    path      : '/products',
    components: {
        default: () => import('@/views/PageContainer.vue'),
        menu   : Menu
    },
    children:[
        {
            path      : '',
            name      : 'Index',
            components: {
                default: () => import('@/views/Products/Index.vue'),
                menu   : Menu
            },
        },
        {
            path      : 'create',
            name      : 'Create',
            components: {
                default: () => import('@/views/Products/Edit.vue'),
                menu   : Menu
            },
        },
        {
            path      : ':id',
            name      : 'Edit',
            components: {
                default: () => import('@/views/Products/Edit.vue'),
                menu   : Menu
            },
        },
    ]
}
