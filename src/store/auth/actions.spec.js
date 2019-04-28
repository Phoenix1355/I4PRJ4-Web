// auth.actions.spec.js

import { login } from './actions';
import { attemptLogin } from '../../api';

jest.mock('../../api');

test('temp', async () => {
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
    };

    attemptLogin.mockImplementation(data => new Promise((resolve, reject) => {
        if (data === loginInfo) {
            return resolve(successInfo);
        }

        return reject({ response: { status: 404 } }); // eslint-disable-line
    }));

    const commit = jest.fn();

    await login({ commit }, {
        email: 'test@test.dk',
        password: 'Hejhej123',
    });

    expect(commit).toBeCalledWith('Waiting', true);
});

/*
describe('Testing actions with mock values', () => {
    it('Login_ValidInfo_TokenCommitWasCalled', () => {
        const successInfo = {
            token: 'string',
            taxiCompany: {
                name: 'John',
                email: 'john-doe@example.com',
                phoneNumber: '88888888',
            },
        };

        attemptLogin.withResolvedValue(successInfo);

        const commit = () => {};

        login({ commit });

        expect(commit).toHaveBeencalledWith('AuthToken', successInfo.token);
    });

    it('Login_ValidInfo_UserCommitWasCalled', async () => {
        const successInfo = {
            token: 'string',
            taxiCompany: {
                name: 'John',
                email: 'john-doe@example.com',
                phoneNumber: '88888888',
            },
        };

        attemptLogin.withResolvedValue(successInfo);

        const commit = jest.fn();

        await login({ commit });

        expect(commit).toHaveBeencalledWith('AuthUser', successInfo.taxiCompany);
    });
});
*/
