// auth/mutations.js

import Cookie from 'js-cookie';

export function AuthToken(state, token) {
    state.token = token;

    if (token == null) {
        return Cookie.remove('token');
    }

    // Set cookie for saving the session
    if (!Cookie.get('token')) {
        Cookie.set('token', token);
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
