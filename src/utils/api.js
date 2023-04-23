
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cipherbackend-d4ms.onrender.com'
    // baseURL: 'http://localhost:9000'

    
});


export default api;