import axios, {AxiosInstance} from 'axios';

const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 50000,
})


export default service;
