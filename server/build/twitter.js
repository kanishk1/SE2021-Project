'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _twitterNodeClient = require('twitter-node-client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var config = {
    "consumerKey": "af4o4Swyctg17u00r2Zbz5L19",
    "consumerSecret": "Kw14FflguqeN30NqJaNpFx2cAwJuijbRDGGsT1JzKhr1ihm5po",
    "accessToken": "836055204583747584-jY0LOOKJHllIXLGBeWvEjno6ICtsRn9",
    "accessTokenSecret": "HYq3alw3NUeEMDaeV5NMz1XQaKWyhtCLmlaKNg5tKgrt3",
    "callBackUrl": "localhost:3001/test"
};

function doAPI(suburb, numtweets) {
    if (!suburb || !numtweets) return _promise2.default.reject('ERROR: [Missing parameters]');

    return new _promise2.default(function (response, fail) {
        var error = function error(err, response, body) {
            fail(err);
        };
        var success = function success(data) {
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
        };

        var hashtag = '#'.concat(suburb);
        var twitter = new _twitterNodeClient.Twitter(config);
        twitter.getSearch({ 'q': hashtag, 'count': numtweets }, error, success);
    });
}

// TWITTER API
// Example Call... http://localhost:3001/twitter/search?suburb=hurstville&num=3
router.get('/search', function (req, res) {
    var suburb = req.query.suburb;
    var numtweets = req.query.num;
    doAPI(suburb, numtweets).then(function (response) {
        return res.send(response);
    }).catch(function (fail) {
        return res.json({ 'error': fail });
    });
});

exports.default = router;