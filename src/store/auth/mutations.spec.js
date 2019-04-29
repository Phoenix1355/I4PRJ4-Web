// auth.spec.js

import Cookie from 'js-cookie';
import { AuthToken, AuthUser, AuthError } from './mutations';

jest.mock('js-cookie');

// Default return value
Cookie.get.mockReturnValue(true);

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

    it('AuthToken_NullToken_CookieWasRemoved', async () => {
        // The fake state
        const state = {
            token: '',
        };

        const token = null;

        await AuthToken(state, token);

        expect(Cookie.remove).toBeCalledWith('token');
    });

    it('AuthToken_NoCookieSet_CookieWasSet', async () => {
        Cookie.get.mockReturnValue(false);

        // The fake state
        const state = {
            token: '',
        };

        const token = 'A valid token';

        await AuthToken(state, token);

        expect(Cookie.set).toBeCalledWith('token', token);
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
