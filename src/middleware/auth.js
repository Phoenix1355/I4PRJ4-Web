/**
 * Authentication middleware
 *
 * Used for pages that require authentication to view. It will redirect the
 * user to login, if the required auth state is missing. It will also
 * revalidate cookies if any is set.
 */

import Cookie from 'js-cookie';

export default ({
    store,
    redirect,
}) => {
    // const authPaths = ['/login', '/signup'];
    if (Cookie.get('token')) {
        // User was authenticated in the previous session.
        store.commit('AuthToken', Cookie.get('token'));
    }

    if (!store.state.auth.token) {
        // Not authenticated
        console.log("Redirecting to '/login'");
        redirect('/login');
    }
};

/*
import Cookie from 'js-cookie';

export default ({
    store,
    redirect,
}) => {
    const { path } = store.$router.currentRoute;
    const authPaths = ['/login', '/signup'];

    if (Cookie.get('token')) {
        // User was authenticated in the previous session.
        store.commit('AuthUser', 'yeeet');
    }

    if (!store.state.auth) {
        console.log('redirecting');
        return redirect('/login');
    }

    console.log(authPaths, path, authPaths.indexOf(path));

    if (store.state.auth) {
        // User is logged in
        if (authPaths.indexOf(path) != -1) {
            // User is on authentication path
            console.log('Redirecting to /');
            return redirect('/');
        }
    } else {
        if (authPaths.indexOf(path) == -1) {
            // User is not trying to log in/sign up
            console.log('Redirecting to /login');
            return redirect('/login');
        }
    }
};

*/
