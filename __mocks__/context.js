// middleware / __mocks__ / context.js

const fakeRoute = {
    path: '/',
};

const fakeStore = (() => {
    const state = {
        auth: {},
    };

    return {
        state,
        commit: jest.fn(),
    };
})();

const fakeRedirect = jest.fn((path) => {
    fakeRoute.path = path;
});

export default {
    store: fakeStore,
    route: fakeRoute,
    redirect: fakeRedirect,
};
