// auth/mutations.js

import jwt from 'jsonwebtoken';

export function AuthToken(state, token) {
    state.token = token;

    if (token != null) {
        const decoded = jwt.decode(token);

        this.commit('AuthUser', {
            name: 'Temp',
            email: decoded.sub,
        });
    }
}

export function AuthUser(state, user) {
    // Forcing proper mutation and discarding unecesarry keys
    state.user = {
        name: user.name,
        email: user.email,
    };
}

export function AuthError(state, error) {
    state.error = error;
}
