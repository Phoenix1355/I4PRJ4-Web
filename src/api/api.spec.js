// api.spec.js

import axios from 'axios';
import { attemptLogin, fetchOpenRides } from './index';

jest.mock('axios');

describe('Testing API Calls', () => {
    it('AttemptLogin_ValidInfo_ApiWasCalled', async () => {
        const fakeEmail = 'hej@hej.com';
        const fakePassword = '1234!Hej';

        await attemptLogin({
            email: fakeEmail,
            password: fakePassword,
        });

        expect(axios.post).toBeCalledWith('/api/TaxiCompany/Login', {
            email: fakeEmail,
            password: fakePassword,
        });
    });

    it('FetchOpenRides_ValidBearerToken_ApiWasCalled', async () => {
        const fakeToken = 'Valid token';

        await fetchOpenRides(fakeToken);

        expect(axios.get).toBeCalledWith('/api/Order/Open', {
            headers: {
                Authorization: `Bearer ${fakeToken}`,
            },
        });
    });

    it('FetchOpenRides_NonValidToken_ReturnsFalse', async () => {
        const fakeToken = null;

        expect(await fetchOpenRides(fakeToken)).toBe(false);
    });
});
