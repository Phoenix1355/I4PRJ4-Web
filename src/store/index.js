/**
 * The main store file
 *
 * Exports a Vuex store.
 */

import Vuex from 'vuex';

import auth from './auth';
import api from './api';

const createStore = () => new Vuex.Store({
    modules: {
        auth,
        api,
    },
});

export default createStore;
