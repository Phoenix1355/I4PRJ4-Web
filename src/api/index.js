// api/index.js

import axios from 'axios';

axios.defaults.baseURL = 'https://smartcabbackend.azurewebsites.net';

export function attemptLogin({ email, password }) {
    return axios.post('/api/TaxiCompany/Login', { email, password });
}

export function openRidesAll(token) {
    if (token === null || token === '') {
        return false;
    }

    return axios.get('/api/Order/Open', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function openRidesDetails(token, id) {
    if (token === null || token === '') {
        return false;
    }

    if (id < 0) {
        return false;
    }

    return axios.get(`/api/Order/${id}/Details`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }, id);
}

export function openRidesAccept(token, id) {
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
    }, id);
}
