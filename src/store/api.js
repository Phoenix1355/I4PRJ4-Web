/**
 * Holds all the store data and methods for the API (axios)
 */

export default {
    state: {
        waiting: false,
    },
    mutations: {
        Waiting(state, waiting) {
            state.waiting = waiting; // Forcing boolean
        },
    },
    actions: {
        // Nothing
    },
};
