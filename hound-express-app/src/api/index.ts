import axios from "axios";

const api = axios.create({
    baseURL: 'https://hound-express-be.onrender.com/api/v1/'
});

export default api;