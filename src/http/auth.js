import axios from "axios";


// const documentURL = document.URL;
// const subdomainEnd = documentURL.indexOf(".");
// const subdomain = documentURL.slice(0,subdomainEnd);
// const baseURL = `${subdomain}.${process.env.VUE_APP_PATH}`
axios.defaults.withCredentials = true;
const baseURL = process.env.VUE_APP_PATH
const auth = axios.create({
    baseURL
});

auth.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });


auth.defaults.withCredentials = true;

export default auth;
