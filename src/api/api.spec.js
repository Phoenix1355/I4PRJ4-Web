// api.spec.js

import axios from 'axios';
import { attemptLogin, fetchOpenRides, acceptRide } from './index';

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

    it('AcceptRide_ValidBearerToken_ApiWasCalled', async () => {
        const fakeToken = 'Valid token';
        const fakeId = '1';

        await acceptRide(fakeToken, fakeId);

        expect(axios.put).toBeCalledWith('/api/Order/1/Accept', {
            headers: {
                Authorization: `Bearer ${fakeToken}`,
            },
        },
        fakeId);
    });

    it('AcceptRide_NonValidTokenValidId_ReturnsFalse', async () => {
        const fakeToken = null;

        const fakeId = 1;

        expect(await acceptRide(fakeToken, fakeId)).toBe(false);
    });

    it('AcceptRide_ValidTokenNonValidId_ReturnsFalse', async () => {
        const fakeToken = 'Valid token';

        const fakeId = -1;

        expect(await acceptRide(fakeToken, fakeId)).toBe(false);
    });

    it('AcceptRide_NonValidTokenNonValidId_ReturnsFalse', async () => {
        const fakeToken = null;

        const fakeId = -1;

        expect(await acceptRide(fakeToken, fakeId)).toBe(false);
    });
});
