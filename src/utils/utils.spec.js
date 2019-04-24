// auth.spec.js

import { expect } from 'chai';
import { displayLocation } from './index';

describe('utils', () => {
    it('DisplayLocation_StringIsCorrect', () => {
        // The mock state
        const location = {
            streetName: 'Testvej',
            streetNumber: '123',
            postalCode: '8200',
            cityName: 'Aarhus N',
        };

        expect(displayLocation(location)).to.equal('Testvej 123, 8200 Aarhus N');
    });
});
