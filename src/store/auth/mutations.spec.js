// auth.spec.js

import { AuthUser, AuthError } from './mutations';

describe('mutations', () => {
    it('AUTH_USER', async () => {
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

        AuthUser(state, user);

        expect(state.user.name).toBe('John');
    });

    it('AUTH_ERROR', async () => {
        // The fake state
        const state = {
            error: '',
        };

        AuthError(state, 'New error');

        expect(state.error).toBe('New error');
    });
});
