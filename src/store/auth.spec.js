// auth.spec.js

import { expect } from 'chai';
import auth from './auth';

const { AuthUser } = auth.mutations;

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

        expect(state.user.name).to.equal('John');
    });
});
