// api/index.js

import axios from 'axios';

axios.defaults.baseURL = 'https://smartcabbackend.azurewebsites.net';

/**
 * Posts a login attempt to the backend api
 *
 * @method Api/attemptLogin
 * @param  {Object}     context The context holding the username and password for destructuring
 * @return {Promsie}            The promise from the axios call
 */
export function attemptLogin({ email, password }) {
    return axios.post('/api/TaxiCompany/Login', { email, password });
}

/**
 * Fetches all the current open rides from the backend Api
 * @method Api/openRidesAll
 * @param  {String}     token The JWT used as authentication bearer token
 * @return {Promise}           The promise from the axios call
 */
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

/**
 * Fetches details for a given ride with a provided ride id
 * @method Api/openRidesDetails
 * @param  {String}         token The JWT used as authentication bearer token
 * @param  {Number}         id    The ride id number
 * @return {Promise}              The promise from the axios call
 */
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
    });
}

/**
 * Puts a call for accpeting a specific ride
 * @method Api/openRidesAccept
 * @param  {String}        token The JWT used for authentication bearer token
 * @param  {Number}        id    The ride id number
 * @return {Promise}             The promise from the axios call
 */
export function openRidesAccept(token, id) {
    if (token === null || token === '') {
        return false;
    }

    if (id < 0) {
        return false;
    }

    return axios.put(`/api/Order/${id}/Accept`, '', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
