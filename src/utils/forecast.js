const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/05f0756687864ddf019b91ebf62c3136/" +
    latitude +
    "," +
    longtitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback(undefined, "Unable to find location");
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is " +
          body.currently.precipProbability +
          "% chance of rain. High Temperature: " +
          body.daily.data[0].temperatureHigh +
          ". Low Temperature: " +
          body.daily.data[0].temperatureLow
      );
    }
  });
};

module.exports = forecast;
