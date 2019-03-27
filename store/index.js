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
        },
        actions: {
            login ({commit, dispatch}, data) {
                this.$axios.post('/api/Customer/Login', data) // should be api/TaxiCompany/Login
                    .then(res => {
                        console.log("res:", res);
                        const {
                            token,
                            customer,
                        } = res.data;

                        // Set state auth
                        commit('setAuth', token);
                        commit('setAccount', customer);

                        // Set cookie for saving the session
                        Cookie.set('token', token);

                        // Redirect to index
                        this.$router.push('/');
                    })
                    .catch(err => {
                        console.log(err.response);
                        commit('setErrorStatus', err.response.status);
                    });
            },
            logout ({commit, dispatch}) {
                Cookie.remove('token');

                commit('setAuth', null);
            },
            signup ({commit, dispatch}, data) {
                // TODO: Implement signup method
            }
        },
    });
};

export default createStore;
