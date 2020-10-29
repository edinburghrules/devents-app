/* global google */

const geocoder = new google.maps.Geocoder();

const getAddressDetails = (coords) => {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: coords }, (results, status) => {
      if (status === 'OK') {
        resolve(results);
      } else {
        reject(new Error('Could not find address at ' + coords));
      }
    });
  });
};

const getFormattedAddress = (addresses) => {

  const formattedAddressArr = addresses.filter((address) => {
    if (address.types[0] === 'locality' && address.types[1] === 'political') {
      return true;
    }
  });

  return formattedAddressArr[0].formatted_address;
};

export { getAddressDetails as default, getFormattedAddress };
