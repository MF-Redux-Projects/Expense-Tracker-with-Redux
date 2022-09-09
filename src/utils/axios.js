import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://lws-fake-product-api.herokuapp.com/",
    baseURL: "http://localhost:9000",
})

export default axiosInstance;
