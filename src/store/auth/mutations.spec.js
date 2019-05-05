// auth.spec.js

import { AuthToken, AuthUser, AuthError } from './mutations';

const localStorageMock = (() => {
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
        test: () => console.log('test'),
    };
})();

Object.defineProperty(global, '_localStorage', {
    value: localStorageMock,
    writable: false,
});

describe('mutations', () => {
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

        expect(localStorageMock.setItem).toBeCalledWith('token', token);
    });

    it('AuthToken_NullToken_LocalStorageSet', async () => {
        // The fake state
        const state = {
            token: '',
        };

        const token = null;

        await AuthToken(state, token);

        expect(localStorageMock.setItem).toBeCalledWith('token', null);
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

    it('AuthError_SimpleState_StateWasSet', async () => {
        // The fake state
        const state = {
            error: '',
        };

        await AuthError(state, 'New error');

        expect(state.error).toBe('New error');
    });
});
