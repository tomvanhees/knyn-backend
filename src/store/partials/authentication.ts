import http from "@/http/http";

export const authentication = {
    namespaced: true,
    state     : {
        token: "" as string
    },
    getters: {
        isAuthenticated(state: any): boolean{
            return state.token !== ""
        },
        getToken(state: any): string {
            return state.token;
        }
    },
    mutations : {
        setToken(state: any, token: string): void {
            state.token = token;
        },
        clearToken(state: any): void {
            state.token = "";
        },

    },
    actions   : {
        clearToken: ({commit}: any) => {
            localStorage.removeItem("token");
            commit('clearToken');
        },
        setToken    : ({commit}: any, token: string) => {
            commit('setToken', token);
        },
        tryAutologin: ({commit}: any) => {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }
            commit('setToken', token);
        },
        logout      : ({dispatch}: any) => {
            http.post("/user/logout").finally(()=>{
                dispatch('clearToken')
            })

        }
    },
}
