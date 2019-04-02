/**
 * Store / Mutations / Auth
 *
 * Holds all the mutations for the authentication
 */

import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

export default {
    state: {
        token: null,
        error: '',
        user: {
            name: '',
            email: '',
        },
    },
    mutations: {
        // Must follow unique syntax [Class][Method] as ClassMethod
        AuthToken(state, token) {
            state.token = token;

            if (token != null) {
                const decoded = jwt.decode(token);

                this.commit('AuthUser', {
                    name: 'Temp',
                    email: decoded.sub,
                });
            }
        },
        AuthUser(state, user) {
            // Forcing proper mutation and discarding unecesarry keys
            state.user = {
                name: user.name,
                email: user.email,
            };
        },
        AuthError(state, error) {
            state.error = error;
        },
    },
    actions: {
        login({ commit }, data) {
            commit('Waiting', true);

            this.$axios.post('/api/Customer/Login', data) // should be api/TaxiCompany/Login
                .then((res) => {
                    const {
                        token,
                        customer,
                    } = res.data;

                    console.log(res);

                    // Response received, stop waiting
                    commit('Waiting', false);

                    // Set state auth
                    commit('AuthToken', token);
                    commit('AuthUser', customer);

                    // Set cookie for saving the session
                    Cookie.set('token', token);

                    // Reset error status
                    commit('AuthError', 0);

                    console.log("Redirecting to '/'");

                    // Redirect to index
                    this.$router.push('/');
                })
                .catch((err) => {
                    commit('Waiting', false);

                    console.log(err);

                    commit('AuthError', err.response.status);

                    console.error(err.response);
                });
        },
        logout({ commit }) {
            Cookie.remove('token');

            commit('AuthToken', null);

            commit('AuthError', 0);
        },
        signup(context, data) { // eslint-disable-line
            // TODO: Implement signup method
        },
    },
};
