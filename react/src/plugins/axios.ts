import axios from "axios";
import Cookies from 'js-cookie';

const baseURL = "http://localhost:8000";

const axiosInstance = axios.create({
    baseURL: `${baseURL}/api/`,
    headers: {
        "XDEBUG_SESSION": "PHPSTORM",
    },
    withCredentials: true,
    withXSRFToken: true
})

axiosInstance.interceptors.request.use(
    async (config) => {
        if (["post", "put", "delete"].includes(config.method!.toLowerCase())
            && !Cookies.get("XSRF-TOKEN"))
        {
            await axiosInstance.get('csrf-cookie')
        }

        return config
    },
    (error) => Promise.reject(error)
)


export default axiosInstance;