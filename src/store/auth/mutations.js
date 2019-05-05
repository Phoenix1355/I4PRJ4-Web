// auth/mutations.js

export function AuthToken(state, token) {
    state.token = token;

    localStorage.setItem('token', token);
}

export function AuthUser(state, user) {
    // Forcing proper mutation and discarding unecesarry keys
    state.user = {
        name: user.name,
        email: user.email,
    };

    localStorage.setItem('user', user);
}

export function AuthError(state, error) {
    state.error = error;
}
