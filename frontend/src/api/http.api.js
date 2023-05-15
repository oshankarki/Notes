import axios from "axios";

// Create an axios instance
const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api/v1",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});
http.interceptors.request.use(
    function(config) {
        const token = localStorage.getItem("");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }
)

http.interceptors.response.use(
    function(response) {
        if (response.status === 200) {
            return response.data;
        } else
            return response;
    }
)
const httpApi = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
};
export default httpApi;