import axios from "axios";
import store from "../store/index";
import router from "../router";


const baseURL = process.env.VUE_APP_PATH

axios.defaults.withCredentials = true;

const http = axios.create({
    baseURL
});

http.interceptors.request.use(
    config => {
        const token = store.state.authentication.token;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers.get['Accepts']   = 'application/json'
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });


http.interceptors.response.use((response) => {
    return response;
},  (error) => {

    /** Token is not validated */
    if (error.response.status === 401) {
        store.dispatch("authentication/clearToken")
        router.push("/signin");
        return Promise.reject(error);
    }

    return Promise.reject(error);
})

http.defaults.withCredentials = true;

export default http;