// auth/action.js

import { attemptLogin } from '../../api';

/**
 * Action for logging in with a token and taxicompany data
 *
 * @method login
 * @param  {Object} context The vuex context
 * @param  {Object} data  The data to handle
 * @return {void}
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

                resolve();
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
 * @method logout
 * @param  {Object} context The vuex context
 * @return {void}
 */
export function logout({ commit }) {
    commit('AuthToken', null);

    commit('AuthError', 0);
}
