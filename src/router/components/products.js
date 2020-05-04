import Menu from "../../components/Menu";
import store from "../../store";

export const products =  {
    path      : '/products',
    name      : 'Products',
    components: {
        default: () => import('../../views/Products/Product'),
        menu   : Menu
    },
    beforeEnter(to, from, next) {
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
                default: () => import('../../views/Products/Index'),
                menu   : Menu
            },
            beforeEnter(to, from, next) {
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
                default: () => import('../../views/Products/Create'),
                menu   : Menu
            },
            beforeEnter(to, from, next) {
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
                default: () => import('../../views/Products/Show'),
                menu   : Menu
            },
            beforeEnter(to, from, next) {
                if (store.state.authentication.token) {
                    next()
                } else {
                    next("/signin")
                }
            },
        },
    ]
}