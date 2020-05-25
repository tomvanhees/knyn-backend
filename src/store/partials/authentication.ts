import http from "@/http/http";

export const authentication = {
    namespaced: true,
    state     : {
        token: "" as string
    },
    mutations : {
        setToken(state: any, token: string) {
            state.token = token;
        },
        clearToken(state: any) {
            state.token = "";
        }
    },
    actions   : {
        clearToken  : ({commit}: any) => {
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