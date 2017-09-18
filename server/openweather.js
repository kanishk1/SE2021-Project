import express from 'express';
import openweather from 'node-openweather';

const router = express.Router();

function doAPI(postcode, country) {
    if (!postcode || !country)
        return Promise.reject("Invalid Parameters.");

    var weather = openweather({
        key: 'aa69bf79cee1f390f63d8203bd191e3b',
        accuracy: "like",
        unit: "metric",
        language: "en"
    });

    return weather.zip(postcode, country).forecast(5)
      .then(function(result) {
        //result['main']['temp'] -= 273.15;
        //result['main']['temp_min'] -= 273.15;
        //result['main']['temp_max'] -= 273.15;
        return result;
      });
}

// Open Weather API
// Example Call... http://localhost:3001/weather?postcode=2220
router.get('/:postcode', (req, res) => {
  const postcode = req.params.postcode;
  const country = 'Australia';
  doAPI(postcode,country)
    .then(response => res.json(response))
    .catch(fail => res.send("Error: " + fail))
});

export default router;
