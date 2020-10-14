import Menu from "@/components/layout/header.vue";

export const gallery = {
    path: '/inspiratie',
    components: {
        default: () => import('@/views/PageContainer.vue'),
        menu: Menu
    }, children: [
        {
            path: '',
            name: 'GalleryIndex',
            components: {
                default: () => import('@/views/Gallery/Index.vue'),
                menu: Menu
            },
        },
        {
            path: 'create',
            name: 'GalleryCreate',
            components: {
                default: () => import('@/views/Gallery/Edit.vue'),
                menu: Menu
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
        }
    ]
}
