export default function doAPI(suburb, numtweets) {
    return new Promise((response, fail) => {
        var error = function (err, response, body) {
            fail('ERROR: [%s]', err);
        }
        var success = function (data) {
            
            // Data parsed...
            data = JSON.parse(data);
            var statuses = data['statuses'];
            
            // We are now to extract the text from each tweet
            var tweets = [];
            var i = 0;
            for (i = 0; i < numtweets; i++) {
                tweets.push(statuses[i]['text']);
            }
            response(tweets);
        }
        
        
        const hashtag = '#'.concat(suburb)
        var Twitter = require('twitter-node-client').Twitter;
        var fs = require('fs');
        var config = JSON.parse(fs.readFileSync('./data/twitter_config.json'));
        var twitter = new Twitter(config);
        twitter.getSearch({'q': hashtag,'count': numtweets}, error, success);
    });
}
