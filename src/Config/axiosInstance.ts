import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    
});

export default axiosInstance

