'use strict';

import express from 'express';
import openweather from 'node-openweather';

const router = express.Router();

const FORECASTS_PER_DAY = 24 / 3;

function getWeather(postcode) {
  const country = 'Australia';

  if (!postcode) {
    return Promise.reject('Invalid Parameters');
  }

  const weather = openweather({
    key: 'aa69bf79cee1f390f63d8203bd191e3b',
    accuracy: "like",
    units: "metric",
    language: "en"
  });

  // disable console.log because openweather annoys me
  const logger = console.log;
  console.log = () => {};

  const promise = weather.zip(postcode, country).forecast(5)

  console.log = logger; // re-enable it now ;)

  return promise.then((result) => {
    const values = [];

    let min = +1e99; let min_dt = null;
    let max = -1e99; let max_dt = null;
    let humidity = 0;
    let conditions = "Hello";

    let num_forecasts_inspected = 0;
    for (const forecast of result['list']) {
      if (num_forecasts_inspected === 0) {
        conditions = forecast['weather'][0]['description'];
      }

      if (forecast['main']['temp'] > max) {
        max = forecast['main']['temp'];
        max_dt = new Date((forecast['dt'] + 36000) * 1000);
      }
      if (forecast['main']['temp'] < min) {
        min = forecast['main']['temp'];
        min_dt = new Date((forecast['dt'] + 36000) * 1000);
      }
      humidity += forecast['main']['humidity'];

      if (++num_forecasts_inspected >= FORECASTS_PER_DAY) {
        humidity /= num_forecasts_inspected;
        values.push({ min, min_dt, max, max_dt, humidity, conditions });

        min = +1e99;
        max = -1e99;
        humidity = 0;
        num_forecasts_inspected = 0;
      }
    }

    if (num_forecasts_inspected > FORECASTS_PER_DAY/2) {
      humidity /= num_forecasts_inspected;
      values.push({ min, min_dt, max, max_dt, humidity, conditions });
    }

    return values;
  });
})

router.get('/:postcode', (req, res) => {
  getWeather(postcode)
    .then(data => res.json(data))
    .catch(err => res.json({'error': '' + err}));
}

export default router;
