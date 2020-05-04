import Menu from "../../components/Menu";
import store from "../../store";

export const gallery = {
    path       : '/gallery',
    name       : 'Gallery',
    components : {
        default: () => import('../../views/Gallery/Gallery'),
        menu   : Menu
    },
    beforeEnter(to, from, next) {
        if (store.state.authentication.token) {
            next()
        } else {
            next("/signin")
        }
    }, children: [
        {
            path      : '',
            name      : 'GalleryIndex',
            components: {
                default: () => import('../../views/Gallery/Index'),
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
            name      : 'GalleryShow',
            components: {
                default:
                    () => import('../../views/Gallery/Show'),
                menu   : Menu
            }
            ,
            beforeEnter(to, from, next) {
                if (store.state.authentication.token) {
                    next()
                } else {
                    next("/signin")
                }
            }
        }
    ]
}
