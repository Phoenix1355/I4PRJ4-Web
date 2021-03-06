// auth.spec.js

import { AuthToken, AuthUser, AuthError } from './mutations';

const fakeLocalStorage = (() => {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value = '') => {
            store[key] = `${value}`; // Force string
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(global, '_localStorage', {
    value: fakeLocalStorage,
    writable: false,
});

describe('AuthMutations', () => {
    beforeEach(() => {
        fakeLocalStorage.getItem.mockReset();
        fakeLocalStorage.setItem.mockReset();
        fakeLocalStorage.removeItem.mockReset();
        fakeLocalStorage.clear.mockReset();
    });

    it('AuthToken_SimpleState_StateWasSet', async () => {
        // The fake state
        const state = {
            token: '',
        };

        const token = 'A valid token';

        await AuthToken(state, token);

        expect(state.token).toBe(token);
    });

    it('AuthToken_ValidToken_LocalStorageSet', async () => {
        // The fake state
        const state = {
            token: '',
        };

        const token = 'Valid Token';

        await AuthToken(state, token);

        expect(fakeLocalStorage.setItem).toBeCalledWith('token', token);
    });

    it('AuthToken_NullToken_LocalStorageSet', async () => {
        // The fake state
        const state = {
            token: '',
        };

        const token = null;

        await AuthToken(state, token);

        expect(fakeLocalStorage.clear).toBeCalled();
    });

    it('AuthUser_SimpleState_StateWasSet', async () => {
        // The mock state
        const state = {
            user: {
                name: '',
                email: '',
            },
        };

        const user = {
            name: 'John',
            email: 'john@example.com',
        };

        await AuthUser(state, user);

        expect(state.user.name).toBe('John');
    });
});
