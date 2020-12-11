const request = require("request");

const geocode = (address, callBack) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYW51c2hhLWNoZW5naSIsImEiOiJja2ljd3B3eW0wbzlsMnhwZXh0eXl3eHRkIn0.ZaX1SHJ9OdWrJnTwS3PFpQ&limit=1`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callBack("Unable to connect to the sserver", undefined);
    } else if (response.body.features.length === 0) {
      callBack("Unable to find location ", undefined);
    } else {
      const geoCodeData = response.body.features[0];
      callBack(undefined, {
        latitude: geoCodeData.center[1],
        longitude: geoCodeData.center[0],
        location: geoCodeData.place_name,
      });
    }
  });
};

module.exports = geocode;
