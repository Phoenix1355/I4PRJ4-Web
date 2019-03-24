import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            auth: null,
        },
        mutations: {
            setAuth(state, auth) {
                state.auth = auth;
            },
        },
        actions: {
            login ({commit, dispatch}, data) {
                this.$axios.post('/api/TaxiCompany/Login', data)
                    .then(res => {
                        Cookie.set('token', res.data.token);
                    })
                    .catch(err => console.log(err));

                commit('setAuth', 'yeeeeet');
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
