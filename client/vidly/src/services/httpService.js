import Axios from "axios";
import { toast } from "react-toastify";

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

Axios.interceptors.response.use(null, error => {
    const expectedErr = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedErr) {
        toast.error("An unexpected error occured.")
        console.log("Logging the error", error);
    }

    return Promise.reject(error);
})

function setJWT(jwt) {
    Axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
    get: Axios.get,
    post: Axios.post,
    put: Axios.put,
    delete: Axios.delete,
    setJWT
}