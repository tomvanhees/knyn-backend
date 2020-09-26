import axios from "axios";
import store from "../store/index";
import router from "../router";


const documentURL = document.URL;
const subdomainEnd = documentURL.indexOf(".");

console.log(subdomainEnd);

const subdomain = documentURL.slice(0,subdomainEnd);

console.log(subdomain)
const baseURL = `${subdomain}.${process.env.VUE_APP_PATH}`

console.log(baseURL)

axios.defaults.withCredentials = true;

const http = axios.create({
    baseURL
});

http.interceptors.request.use(
    config => {
        const token = store.getters["authentication/getToken"];
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers.get['Accepts']   = 'application/json'
        }
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
