import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import domain from './domain_cred'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router()

router.get('/hello', (req, res) => {
  const param = req.query.q;
  if (param) {
    res.json({
      name: param
    });
    return;
  }
});

// test for GET requests
router.get('/domain/get/:id', (req, res) => {
  domain('https://api.domain.com.au/v1/listings/' + req.params.id)
    .then(data => res.json(data))
    .catch(err => res.end(JSON.stringify(err)));
});

// test for POST requests
import test_form from './test_form.json'
router.get('/domain/search', (req, res) => {
  domain('https://api.domain.com.au/v1/listings/_search', test_form)
    .then(data => res.json(data))
    .catch(err => res.end(JSON.stringify(err)));
});

app.get('/test', function(req, res){
    res.send('hello world');
});

// TWITTER API CALL
// Example Call... http://localhost:3001/twitter/search?suburb=hurstville&num=3
router.get('/twitter/search', (req, res) => {
    const suburb = req.query.suburb;
    const numtweets = req.query.num;
    if (suburb && numtweets) {
        
        var error = function (err, response, body) {
            console.log('ERROR [%s]', err);
        }
        var success = function (data) {
            data = JSON.parse(data);
            
            // This is an array of all the statuses
            var statuses = data['statuses'];
            
            // We are now to extract the text from each tweet
            var tweets = [];
            var i = 0;
            for (i = 0; i < numtweets; i++) {
                tweets.push(statuses[i]['text']);
            }
            res.send(tweets);
        }
        
        const hashtag = '#'.concat(suburb)
        var Twitter = require('twitter-node-client').Twitter;
        var fs = require('fs');
        var config = JSON.parse(fs.readFileSync('./data/twitter_config.json'));
        var twitter = new Twitter(config);
        twitter.getSearch({'q': hashtag,'count': numtweets}, error, success);
    }

});

app.use(router)

// any routes not picked up by the server api will be handled by the react router
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})
