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

const getFormattedAddress = (address) => {
  let formattedAddress;
  if (address[0].formatted_address.includes('UK')) {
    formattedAddress = address[8].formatted_address;
  } else if (address[0].formatted_address.includes('US')) {
    formattedAddress = address[5].formatted_address;
  } else {
    formattedAddress = address[8].formatted_address;
  }
  return formattedAddress;
};

export { getAddressDetails as default, getFormattedAddress };
