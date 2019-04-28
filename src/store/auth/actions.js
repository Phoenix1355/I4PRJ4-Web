// auth/action.js

import Cookie from 'js-cookie';
import { attemptLogin } from '../../api';

export function login({ commit }, data) {
    commit('Waiting', true);

    return attemptLogin(data) // should be api/TaxiCompany/Login
        .then((res) => {
            console.log('res: ', res);
            const {
                token,
                taxiCompany,
            } = res.data;

            // Response received, stop waiting
            commit('Waiting', false);

            // Set state auth
            commit('AuthToken', token);
            commit('AuthUser', taxiCompany);

            // Set cookie for saving the session
            Cookie.set('token', token);

            // Reset error status
            commit('AuthError', 0);

            // Redirect to index
            this.$router.push('/');
        })
        .catch((err) => {
            commit('Waiting', false);

            console.log("err:", err);

            commit('AuthError', err.response.status);
        });
}

export function logout({ commit }) {
    Cookie.remove('token');

    commit('AuthToken', null);

    commit('AuthError', 0);
}
