import http from "@/http/http";

export const authentication = {
    namespaced: true,
    state     : {
        token: ""
    },
    getters: {
        isAuthenticated(state){
            return state.token !== ""
        },
        getToken(state) {
            return state.token;
        }
    },
    mutations : {
        setToken(state, token) {
            state.token = token;
        },
        clearToken(state) {
            state.token = "";
        },

    },
    actions   : {
        clearToken: ({commit}) => {
            localStorage.removeItem("token");
            commit('clearToken');
        },
        setToken    : ({commit}, token) => {
            commit('setToken', token);
        },
        tryAutologin: ({commit}) => {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }
            commit('setToken', token);
        },
        logout      : ({dispatch}) => {
            http.post("/user/logout").finally(()=>{
                dispatch('clearToken')
            })

        }
    },
}
