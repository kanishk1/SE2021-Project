import express from 'express';
import { Twitter } from 'twitter-node-client';

const router = express.Router();
const config = {
"consumerKey": "af4o4Swyctg17u00r2Zbz5L19",
"consumerSecret": "Kw14FflguqeN30NqJaNpFx2cAwJuijbRDGGsT1JzKhr1ihm5po",
"accessToken": "836055204583747584-jY0LOOKJHllIXLGBeWvEjno6ICtsRn9",
"accessTokenSecret": "HYq3alw3NUeEMDaeV5NMz1XQaKWyhtCLmlaKNg5tKgrt3",
"callBackUrl": "localhost:3001/test"
}

function doAPI(suburb, numtweets) {
    if (!suburb || !numtweets)
      return Promise.reject('ERROR: [Missing parameters]');

    return new Promise((response, fail) => {
        var error = function (err, response, body) {
            fail(err);
        }
        var success = function (data) {
            // Data parsed...
            data = JSON.parse(data);
            var statuses = data['statuses'];
            // We are now to extract the text from each tweet
            var tweets = [];
            var i = 0;
            for (i = 0; i < statuses.length && i < numtweets; i++) {
                tweets.push(statuses[i]['id_str']);
            }
            response(tweets);
        }

        const hashtag = '#'.concat(suburb)
        const twitter = new Twitter(config);
        twitter.getSearch({'q': hashtag,'count': numtweets}, error, success);
    });
}

// TWITTER API
// Example Call... http://localhost:3001/twitter/search?suburb=hurstville&num=3
router.get('/search', (req, res) => {
    const suburb = req.query.suburb;
    const numtweets = req.query.num;
    doAPI(suburb,numtweets)
        .then(response => res.send(response))
        .catch(fail => res.json({'error': fail}));
});

export default router;
