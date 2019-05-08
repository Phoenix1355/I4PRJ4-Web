// auth/mutations.js

export function AuthToken(state, token) {
    state.token = token;

    if (state.token == null) {
        localStorage.clear();
    } else {
        localStorage.setItem('token', token);
    }
}

export function AuthUser(state, { name, email }) {
    state.user = {
        name,
        email,
    };

    localStorage.setItem('user', JSON.stringify({ name, email }));
}
