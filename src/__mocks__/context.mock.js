// middleware / __mocks__ / context.js

const fakeRoute = {
    path: '/',
};

const fakeStore = (() => {
    const state = {
        auth: {
            token: null,
        },
    };

    const commit = jest.fn();
    const dispatch = jest.fn();

    return {
        state,
        commit,
        dispatch,
    };
})();

const fakeRedirect = jest.fn((path) => {
    fakeRoute.path = path;
});

export default {
    store: fakeStore,
    route: fakeRoute,
    redirect: fakeRedirect,
    clear: () => {
        // Store
        fakeStore.commit.mockClear();
        fakeStore.dispatch.mockClear();
        fakeStore.state.auth = {
            token: null,
        };
        // Reset route
        fakeRoute.path = '/';
        // Reset redirect
        fakeRedirect.mockClear();
    },
};
