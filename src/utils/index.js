/**
 * Utilities
 */

/**
 * Converts a google location into a formatted string
 *
 * @method displayLocation
 * @param  {Object}        args   The location
 * @return {String}               The formatted location string
 */
export const displayLocation = ({
    streetName,
    streetNumber,
    postalCode,
    cityName,
}) => `${streetName} ${streetNumber}, ${postalCode} ${cityName}`;
