// auth.actions.spec.js

import { login, logout } from './actions';
import { attemptLogin } from '../../api';

jest.mock('../../api');

/* --- SETUP --- */
const loginInfo = {
    email: 'test@test.dk',
    password: 'Hejhej123-',
};

const successInfo = {
    token: 'string',
    taxiCompany: {
        name: 'John',
        email: 'john-doe@example.com',
        phoneNumber: '88888888',
    },
    response: {
        status: 200,
    },
};

const errorInfo = {
    response: {
        status: 400,
    },
};

attemptLogin.mockImplementation(({ email, password }) => new Promise(
    (resolve, reject) => {
        if ((email === loginInfo.email && password === loginInfo.password)) {
            resolve({ data: successInfo });
        } else {
            reject(errorInfo);
        }
    }
));

/* --- TESTS --- */
describe('Testing actions with mock values', () => {
    it('Login_ValidInfo_CommitsWasCalled', async () => {
        const commit = jest.fn();

        await login({ commit }, {
            email: 'test@test.dk',
            password: 'Hejhej123-',
        });

        expect(commit.mock.calls).toEqual([
            ['Waiting', true],
            ['Waiting', false],
            ['AuthToken', successInfo.token],
            ['AuthUser', successInfo.taxiCompany],
            ['AuthError', 0],
        ]);
    });

    it('Login_InvalidInfo_CommitsWasCalled', async () => {
        const commit = jest.fn();

        await login({ commit }, {
            email: 'test@test.dk',
            password: 'invalid',
        });

        expect(commit.mock.calls).toEqual([
            ['Waiting', true],
            ['Waiting', false],
            ['AuthError', 400],
        ]);
    });

    it('Logout_DefaultState_CommitsWasCalled', async () => {
        const commit = jest.fn();

        await logout({ commit });

        expect(commit.mock.calls).toEqual([
            ['AuthToken', null],
            ['AuthError', 0],
        ]);
    });
});
