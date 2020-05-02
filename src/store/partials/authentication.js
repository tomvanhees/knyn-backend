export const authentication = {
    namespaced: true,
    state     : {
        token: ""
    },
    mutations : {
        setToken(state, value) {
            state.token = value;
        },
        clearToken(state) {
            state.token = "";
        }
    },
    actions   : {
        clearToken  : ({commit}) => {
            localStorage.removeItem("token");
            commit('clearToken');
        },
        setToken    : ({commit}, value) => {
            commit('setToken', value);
        },
        tryAutologin: ({commit}) => {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            commit('setToken', token);
        }
    },
}