// auth/action.js

import { attemptLogin } from '../../api';

/**
 * Action for logging in with a token and taxicompany data
 *
 * @method Store/Auth/login
 * @param  {Object} context The store context
 * @param  {Object} data    The data to handle
 * @return {Promise}        A new promise based on the results of the api call
 */
export function login({ commit }, data) {
    commit('Waiting', true);

    return new Promise((resolve, reject) => {
        attemptLogin(data) // should be api/TaxiCompany/Login
            .then((res) => {
                const {
                    token,
                    taxiCompany,
                } = res.data;

                // Response received, stop waiting
                commit('Waiting', false);

                // Set state auth
                commit('AuthToken', token);
                commit('AuthUser', taxiCompany);

                resolve(res.data);
            })
            .catch((err) => {
                // Error carched, stop waiting
                commit('Waiting', false);

                reject(err);
            });
    });
}

/**
 * Action for logging the user out.
 *
 * Removes the active cookie and reset the token.
 *
 * @method Store/Auth/logout
 * @param  {Object} context The store context
 * @return {void}
 */
export function logout({ commit }) {
    commit('AuthToken', null);
}
