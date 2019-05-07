// api.spec.js

import auth from './auth';
import fakeLocalStorage from '../__mocks__/localStorage.mock';
import fakeContext from '../__mocks__/context.mock';

Object.defineProperty(global, '_localStorage', {
    value: fakeLocalStorage,
    writable: false,
});

const validJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUZXN0IEpXVCIsImlhdCI6MTU1NzI2ODEyMiwiZXhwIjoyNTMyNDIwNjAwLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiUm9sZSI6IlByb2plY3QgQWRtaW5pc3RyYXRvciJ9.1YfrFCph1WWM1gSyihxajSSsL24qWvRFQJxbFE8ewd4';
const expiredJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUZXN0IEpXVCIsImlhdCI6MTU1NzI2ODEyMiwiZXhwIjoxNTU0MTEzNDAwLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiUm9sZSI6IlByb2plY3QgQWRtaW5pc3RyYXRvciJ9.JWWAKMBHBsE1BffPQoUBck1rqxtKzAm75gjdwz89cBs';

describe('Testing Authentication Middleware', () => {
    beforeEach(() => {
        // Clear context
        fakeContext.clear();

        // Clear localStorage
        fakeLocalStorage.clear();
    });

    it('AuthMiddleware_ValidTokenNotInStore_CommitWasCalled', async () => {
        fakeLocalStorage.setItem('token', validJWT);
        fakeLocalStorage.setItem('user', '{ "name": "test" }');

        await auth(fakeContext);

        expect(fakeContext.store.commit).toBeCalledWith('AuthToken', validJWT);
        expect(fakeContext.store.commit).toBeCalledWith('AuthUser', { name: 'test' });
    });

    it('AuthMiddleware_ValidTokenInStore_CommitWasNotCalled', async () => {
        fakeContext.store.state.auth.token = validJWT;

        fakeLocalStorage.setItem('token', validJWT);

        await auth(fakeContext);

        expect(fakeContext.store.commit.mock.calls.length).toBe(0);
    });

    it('AuthMiddleware_ValidTokenInStoreLoginScreen_RedirectWasCalled', async () => {
        fakeContext.store.state.auth.token = validJWT;
        fakeContext.route.path = '/login';

        await auth(fakeContext);

        expect(fakeContext.redirect).toBeCalledWith('/');
    });

    it('AuthMiddleware_InvalidTokenInStoreLoginScreen_LogoutWasCalled', async () => {
        fakeLocalStorage.setItem('token', expiredJWT);
        fakeLocalStorage.setItem('user', '{ "name": "test" }');

        await auth(fakeContext);

        expect(fakeContext.store.dispatch).toBeCalledWith('logout');
    });

    it('AuthMiddleware_NoTokenIndexScreen_RedirectWasCalled', async () => {
        await auth(fakeContext);

        expect(fakeContext.redirect).toBeCalledWith('/login');
    });
});
