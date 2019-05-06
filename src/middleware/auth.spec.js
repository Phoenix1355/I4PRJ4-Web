// api.spec.js

import auth from './auth';
import fakeLocalStorage from './__mocks__/localStorage';
import fakeContext from './__mocks__/context';

Object.defineProperty(global, '_localStorage', {
    value: fakeLocalStorage,
    writable: false,
});

describe('Testing Authentication Middleware', () => {
    beforeEach(() => {
        // Clear context
        fakeContext.store.commit.mockClear();

        // Clear localStorage
        fakeLocalStorage.clear();
    });

    it('AuthMiddleware_TokenNotInStore_CommitWasCalled', async () => {
        fakeLocalStorage.setItem('token', 'Valid Token');
        fakeLocalStorage.setItem('user', '{ "name": "test" }');

        await auth(fakeContext);

        expect(fakeContext.store.commit).toBeCalledWith('AuthToken', 'Valid Token');
        expect(fakeContext.store.commit).toBeCalledWith('AuthUser', { name: 'test' });
    });

    it('AuthMiddleware_TokenInStore_CommitWasNotCalled', async () => {
        fakeContext.store.state.auth.token = 'Valid Token';

        fakeLocalStorage.setItem('token', 'Valid Token');

        await auth(fakeContext);

        expect(fakeContext.store.commit.mock.calls.length).toBe(0);
    });

    it('AuthMiddleware_TokenInStoreLoginScreen_RedirectWasCalled', async () => {
        fakeContext.route.path = '/login';

        await auth(fakeContext);

        expect(fakeContext.redirect).toBeCalledWith('/');
    });

    it('AuthMiddleware_TokenNotInStoreIndexScreen_RedirectWasCalled', async () => {
        await auth(fakeContext);

        expect(fakeContext.redirect).toBeCalledWith('/login');
    });
});
