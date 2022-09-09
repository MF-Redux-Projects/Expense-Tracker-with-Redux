import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://lws-fake-product-api.herokuapp.com/",
})

export default axiosInstance;
