import express from 'express';

const router = express.Router();

function doAPI(suburb, numResults) {
    if (!suburb || !numResults)
        return Promise.reject("Invalid Parameters");

    return new Promise((response, fail) => {
        var apikey1 = '2e466941fe314289af733fa47696b09c';
        var apikey2 = '39937d23b2784b3584ce3252c1c11e44';
        var Bing = require('node-bing-api')({ accKey: apikey1 });
        Bing.news(suburb, {
            count: numResults,
            market: 'en-AU',
            adult: 'Strict'
        }, function(error, res, body) {
            response(JSON.stringify(body,null,2))
        });
    });
}

// Bing API
// Example Call... http://localhost:3001/bing/search?suburb=hurstville&num=10
router.get('/search', (req, res) => {
    const suburb = req.query.suburb;
    const numResults = req.query.num;
    doAPI(suburb, numResults)
        .then(response => res.end(response))
        .catch(fail => res.send(fail))
});

export default router;
