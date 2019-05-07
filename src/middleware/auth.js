/**
 * Authentication middleware
 *
 * Used for pages that require authentication to view. It will redirect the
 * user to login, if the required auth state is missing. It will also
 * revalidate cookies if any is set.
 */

import { decode } from 'jsonwebtoken';

/**
 * Authentication middleware
 *
 * @method
 * @param  {Object}  context  The nuxt context that holds the vuex store and routes
 * @return {void}
 */
export default async ({
    store,
    route,
    redirect,
}) => {
    const { path } = route;
    const authPaths = ['/login'];

    // Check if a token is saved
    if (localStorage.getItem('token')) {
        // Validate the tokens expiration date
        const token = localStorage.getItem('token');

        // Convert now to total time in seconds
        const now = Math.round(Date.now() / 1000);
        // Get the expiration time from the token
        const expire = decode(token).exp;

        // If token has expired
        if (now > expire) {
            await store.dispatch('logout');
        } else if (!store.state.auth.token) {
            // Token isn't set in the store
            await store.commit('AuthToken', token);
            await store.commit('AuthUser', JSON.parse(localStorage.getItem('user')));
        }
    }

    if (!store.state.auth.token && authPaths.indexOf(path) === -1) {
        // If token isn't set (not logged in) and user isn't on login
        // screen, then redirect the user to login.
        redirect('/login');
    } else if (store.state.auth.token && authPaths.indexOf(path) >= 0) {
        // If token is set (logged in) and the user is on login screen,
        // then redirect the user to home.
        redirect('/');
    }
};
