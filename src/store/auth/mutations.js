// auth/mutations.js

export function AuthToken(state, token) {
    state.token = token;

    localStorage.setItem('token', token);
}

export function AuthUser(state, { name, email }) {
    // Forcing proper mutation and discarding unecesarry keys
    state.user = {
        name,
        email,
    };

    localStorage.setItem('user', { name, email });
}

export function AuthError(state, error) {
    state.error = error;
}
