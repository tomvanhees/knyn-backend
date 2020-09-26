import axios from "axios";




const documentURL = document.URL;
const subdomainEnd = documentURL.indexOf(".");

console.log(subdomainEnd);

const subdomain = documentURL.slice(0,subdomainEnd);

console.log(subdomain)
const baseURL = `${subdomain}.${process.env.VUE_APP_PATH}`

console.log(baseURL)
axios.defaults.withCredentials = true;

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
