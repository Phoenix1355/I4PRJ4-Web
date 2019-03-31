import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            auth: null,
            errorStatus: '',
            account: {
                name: '',
                email: '',
            },
            waiting: false, // Waiting for an api call
        },
        mutations: {
            setAuth(state, auth) {
                state.auth = auth;
            },
            setAccount(state, acc) {
                state.account = acc;
            },
            setErrorStatus(state, error) {
                state.errorStatus = error;
            },
            setWaiting(state, wait) {
                state.waiting = wait;
            }
        },
        actions: {
            login ({commit, dispatch}, data) {
                commit('setWaiting', true);

                this.$axios.post('/api/Customer/Login', data) // should be api/TaxiCompany/Login
                    .then(res => {
                        const {
                            token,
                            customer,
                        } = res.data;

                        // Response received, stop waiting
                        commit('setWaiting', false);

                        // Set state auth
                        commit('setAuth', token);
                        commit('setAccount', customer);

                        // Set cookie for saving the session
                        Cookie.set('token', token);

                        // Reset error status
                        commit('setErrorStatus', 0);

                        // Redirect to index
                        this.$router.push('/');
                    })
                    .catch(err => {
                        commit('setWaiting', false);

                        commit('setErrorStatus', err.response.status);

                        console.error(err.response);
                    });
            },
            logout ({commit, dispatch}) {
                Cookie.remove('token');

                commit('setAuth', null);

                commit('setErrorStatus', 0);
            },
            signup ({commit, dispatch}, data) {
                // TODO: Implement signup method
            }
        },
    });
};

export default createStore;
