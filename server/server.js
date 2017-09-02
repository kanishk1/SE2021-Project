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
// Right now just searches #hurstville, can easily make it into any inputted suburb
// It refuses to print nicely and Idk hwo to iterate through it so I give up im going to go watch netflix
//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    router.get('/twitter/search', (req, res) => {
    res.send(data)
    });
}

var Twitter = require('twitter-node-client').Twitter;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./data/twitter_config.json'));
var twitter = new Twitter(config);
twitter.getSearch({'q': '#hurstville','count': 10}, error, success);


app.use(router)

// any routes not picked up by the server api will be handled by the react router
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})
