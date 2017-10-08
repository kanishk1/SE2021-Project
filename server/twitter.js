import express from 'express';
import { Twitter } from 'twitter-node-client';
import config from './data/twitter_config.json';

const router = express.Router();

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
