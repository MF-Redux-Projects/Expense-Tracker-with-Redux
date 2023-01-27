import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://mf-redux.onrender.com",
})

export default axiosInstance;
