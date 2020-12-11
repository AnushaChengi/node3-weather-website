const request = require("request");

const locationBasedWeatherForecast = (lat, lng, callBack) => {
  const url = `http://api.weatherstack.com/current?access_key=6f1fd31a451d4cd97b4c201a04fa14da&loca&query=${lat},${lng}&units=m`;
  request({ url: url, json: true }, (error, response) => {
    let body = response.body;
    if (error) {
      callBack("Unable to connect to the server", undefined);
    } else if (body.error) {
      callBack("Unable to find location", undefined);
    } else {
      const data = body.current;
      // callback(
      //   undefined,
      //   body.daily.data[0].summary +
      //     " It is currently " +
      //     body.current.temperature +
      //     " degress out. This high today is " +
      //     body.daily.data[0].temperatureHigh +
      //     " with a low of " +
      //     body.daily.data[0].temperatureLow +
      //     ". There is a " +
      //     body.currently.precipProbability +
      //     "% chance of rain."
      // );

      callBack(undefined, {
        weather_descriptions: data.weather_descriptions[0],
        temperature: data.temperature,
        feelslike: data.feelslike,
      });
    }
  });
};

module.exports = locationBasedWeatherForecast;
