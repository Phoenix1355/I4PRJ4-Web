// api/index.js

import axios from 'axios';

axios.defaults.baseURL = 'https://smartcabbackend.azurewebsites.net';

export function attemptLogin({ email, password }) {
    return axios.post('/api/TaxiCompany/Login', { email, password });
}

export function fetchOpenRides(token) {
    if (token === null || token === '') {
        return false;
    }

    return axios.get('/api/Order/Open', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function acceptRide(token, id) {
    if (token === null || token === '') {
        return false;
    }

    if (id < 0) {
        return false;
    }

    return axios.put(`/api/Order/${id}/Accept`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    id);
}
