import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

const BASE_URL = 'https://socialnguyen.herokuapp.com'
const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;