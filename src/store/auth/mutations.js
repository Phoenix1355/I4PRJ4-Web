// auth/mutations.js

/**
 * Mutation for setting the current authentication token. Also saves it in the
 * localStorage
 *
 * @method      Store/Auth/AuthToken
 * @param       {Object}  state The store state
 * @param       {String}  token The JWT token
 * @returns     {void}
 */
export function AuthToken(state, token) {
    state.token = token;

    if (state.token == null) {
        localStorage.clear();
    } else {
        localStorage.setItem('token', token);
    }
}

/**
 * Mutation for setting the user name and email. Also saves it in the
 * localStorage
 *
 * @method      Store/Auth/AuthUser
 * @param       {Object} state The store state
 * @param       {Object} data  The data object holding the name and email
 * @returns     {void}
 */
export function AuthUser(state, { name, email }) {
    state.user = {
        name,
        email,
    };

    localStorage.setItem('user', JSON.stringify({ name, email }));
}
