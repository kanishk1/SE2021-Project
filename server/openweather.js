import express from 'express';

const router = express.Router();

function doAPI(postcode, country) {
    return new Promise((response, fail) => {
        var weather = require('node-openweather')({
            key: 'aa69bf79cee1f390f63d8203bd191e3b',
            accuracy: "like",
            unit: "metric",
            language: "en"
        });
        weather.zip(postcode, country).forecast(5).then(function(result) {
            //result['main']['temp'] -= 273.15;
            //result['main']['temp_min'] -= 273.15;
            //result['main']['temp_max'] -= 273.15; 
            response(JSON.stringify(result,null,2))
        }).catch(function(err) {
            fail(err)
        });
    });
}

// Open Weather API
// Example Call... http://localhost:3001/weather?postcode=2220
router.get('/weather', (req, res) => {
    const postcode = req.query.postcode;
    const country = 'Australia';
    if (postcode && country) {
        doAPI(postcode,country)
            .then(response => res.end(response))
            .catch(fail => res.send(fail))
    }
});

export default router;
