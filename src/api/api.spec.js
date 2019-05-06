// api.spec.js

import axios from 'axios';
import {
    attemptLogin,
    openRidesAll,
    openRidesDetails,
    openRidesAccept,
} from './index';

jest.mock('axios');

describe('Testing API Calls', () => {
    beforeEach(() => {
        axios.mockReset();
    });

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

    it('OpenRidesAll_ValidBearerToken_ApiWasCalled', async () => {
        const fakeToken = 'Valid token';

        await openRidesAll(fakeToken);

        expect(axios.get).toBeCalledWith('/api/Order/Open', {
            headers: {
                Authorization: `Bearer ${fakeToken}`,
            },
        });
    });

    it('OpenRidesAll_NonValidToken_ReturnsFalse', async () => {
        const fakeToken = null;

        expect(await openRidesAll(fakeToken)).toBe(false);
    });

    it('OpenRidesDetails_ValidBearerToken_ApiWasCalled', async () => {
        const fakeToken = 'Valid token';
        const fakeId = '1';

        await openRidesDetails(fakeToken, fakeId);

        expect(axios.get).toBeCalledWith('/api/Order/1/Details', {
            headers: {
                Authorization: `Bearer ${fakeToken}`,
            },
        }, fakeId);
    });

    it('OpenRidesDetails_NonValidTokenValidId_ReturnsFalse', async () => {
        const fakeToken = null;

        const fakeId = 1;

        expect(await openRidesDetails(fakeToken, fakeId)).toBe(false);
    });

    it('OpenRidesDetails_ValidTokenNonValidId_ReturnsFalse', async () => {
        const fakeToken = 'Valid token';

        const fakeId = -1;

        expect(await openRidesDetails(fakeToken, fakeId)).toBe(false);
    });

    it('OpenRidesDetails_NonValidTokenNonValidId_ReturnsFalse', async () => {
        const fakeToken = null;

        const fakeId = -1;

        expect(await openRidesDetails(fakeToken, fakeId)).toBe(false);
    });

    it('OpenRidesAccept_ValidBearerToken_ApiWasCalled', async () => {
        const fakeToken = 'Valid token';
        const fakeId = '1';

        await openRidesAccept(fakeToken, fakeId);

        expect(axios.put).toBeCalledWith('/api/Order/1/Accept', {
            headers: {
                Authorization: `Bearer ${fakeToken}`,
            },
        }, fakeId);
    });

    it('OpenRidesAccept_NonValidTokenValidId_ReturnsFalse', async () => {
        const fakeToken = null;

        const fakeId = 1;

        expect(await openRidesAccept(fakeToken, fakeId)).toBe(false);
    });

    it('OpenRidesAccept_ValidTokenNonValidId_ReturnsFalse', async () => {
        const fakeToken = 'Valid token';

        const fakeId = -1;

        expect(await openRidesAccept(fakeToken, fakeId)).toBe(false);
    });

    it('OpenRidesAccept_NonValidTokenNonValidId_ReturnsFalse', async () => {
        const fakeToken = null;

        const fakeId = -1;

        expect(await openRidesAccept(fakeToken, fakeId)).toBe(false);
    });
});
