import axios from "axios";

const apiAdmin = axios.create({
    baseURL: "http://localhost:8080/api"
});

apiAdmin.interceptors.request.use((config) => {

    const token = localStorage.getItem("adminToken");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


apiAdmin.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem("adminToken");
           
        }

        if(error.response?.status === 403){
            console.log("Access Denied");
        }

        return Promise.reject(error);
    }
);

export default apiAdmin;