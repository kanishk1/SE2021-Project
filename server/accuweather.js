export default function doAPI(postcode, country) {
    return new Promise((response, fail) => {
        var weather = require('node-openweather')({
            key: 'aa69bf79cee1f390f63d8203bd191e3b',
            accuracy: "like",
            unit: "metric",
            language: "en"
        });
        weather.zip(postcode, country).now().then(function(result) {
            result['main']['temp'] -= 273.15;
            result['main']['temp_min'] -= 273.15;
            result['main']['temp_max'] -= 273.15; 
            response(JSON.stringify(result,null,2))
        }).catch(function(err) {
            fail(err)
        });
    });
}
