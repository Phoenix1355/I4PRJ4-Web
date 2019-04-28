// auth.spec.js

import { AuthToken, AuthUser, AuthError } from './mutations';

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
