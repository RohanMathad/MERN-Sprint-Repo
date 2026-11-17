import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Adjust if your backend port is different
});

// Intercept requests to attach the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Intercept responses to automatically log out if the token expires (401/403)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // If backend says token is invalid/expired, clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // You can also force a page reload here to push them back to the login screen
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;