// api/index.js

import axios from 'axios';

axios.defaults.baseURL = 'https://smartcabbackend.azurewebsites.net';

export function attemptLogin({ email, password }) {
    return axios.post('/api/TaxiCompany/Login', { email, password });
}

export function fetchOpenRides(token) {
    return axios.get('/api/Order/Open', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
