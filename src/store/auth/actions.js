// auth/action.js

import { attemptLogin } from '../../api';

export function login({ commit }, data) {
    commit('Waiting', true);

    return attemptLogin(data) // should be api/TaxiCompany/Login
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

            // Reset error status
            commit('AuthError', 0);
        })
        .catch((err) => {
            commit('Waiting', false);

            commit('AuthError', err.response.status);
        });
}

export function logout({ commit }) {
    commit('AuthToken', null);

    commit('AuthError', 0);
}
