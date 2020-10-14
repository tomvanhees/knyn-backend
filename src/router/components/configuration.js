import Menu from "@/components/layout/header.vue";
export const configuration = {
  path      : '/configuration',
  components: {
    default: () => import('@/views/PageContainer.vue'),
    menu   : Menu
  },
  children  : [
    {
      path     : "",
      name     : "Main",
      component: () => import('@/views/Configuration/Main.vue')
    },
  ],
}
