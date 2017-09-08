import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import domain from './domain_cred'
import wiki from 'wikijs';
import * as db from './db'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

var request = require('request')

var places = {
    api_key : "AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q",
    keyword : "thai",
    location: "-33.8670522,151.1957362",
    radius: "500",
    type: "restaurant",
}

// Google Places API
app.get('/placesapi', function(req, res, next) {
    request(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + places.location + "&radius=" + places.radius + "&type=" + places.type + "&keyword=" + places.keyword + "&key="+ places.api_key,
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // res.json(body);
            res.set('Content-Type', 'text/json');
            // console.log(body);
            res.send(body);
        }
        else {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        }
    });
});

// Google Maps API
// var gmAPI = new GoogleMapsAPI();
// api_key=AIzaSyAGYGaI7RcITTzVzSyxxUc-I-q5E4NZ0R8

app.get('/mapsapi', function(req, res, next) {
    request(
    "https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=AIzaSyCFITeGb3Qs7esM0iDS9mdc41Xmp9pn4RY",
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // res.json(body);
            res.set('Content-Type', 'image/png');
            // console.log(response);
            res.type('png');
            res.sendFile(response.body);
        }
        else {
            res.send(response);
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        }
    });
});

// Wiki API
app.get('/wikiapi', function(req, res, next) {
    request(
    "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json",
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // res.json(body);
            res.set('Content-Type', 'text/html');
            // console.log(body);
            res.send(body);
            // console.log(body);
        }
        else {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        }
    });
});

// Census API
app.get('/censusapi', function(req, res, next) {
    request(
    "http://stat.data.abs.gov.au/restsdmx/sdmx.ashx/GetDataStructure/ABS_C16_T01_LGA?pid=01d10e24-7886-4949-b0b2-c372a2266374",
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // res.json(body);
            res.set('Content-Type', 'text/xml');
            // console.log(body);
            res.send(body);
            // console.log(body);
        }
        else {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        }
    });
});


// EXAMPLE STUFF HERE
router.get('/hello', (req, res) => {
  const param = req.query.q;
  if (param) {
    res.json({
      name: param
    });
    return;
  }
});

app.get('/test', function(req, res){
    res.send('hello world');
});

// DOMAIN API
router.get('/domain/search', (req, res) => {
    // We need to get the Suburb address value first...
    const suburb = req.query.suburb;
    const suburbquery = 'suburb=' + suburb.split(' ').join('+') + '&';
    const statequery = 'state=NSW';
    const searchlevel = '?searchLevel=Suburb&'
    const totalQuery = 'https://api.domain.com.au/v1/addressLocators' + searchlevel + suburbquery + statequery;
    console.log(totalQuery)
    console.log('https://api.domain.com.au/v1/addressLocators?searchLevel=Suburb&suburb=Hurstville&state=NSW')
    domain(totalQuery)
        .then(data => res.json(data))
        .catch(err => res.end(JSON.stringify(err)));
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

// TWITTER API CALL
// Example Call... http://localhost:3001/twitter/search?suburb=hurstville&num=3
router.get('/twitter/search', (req, res) => {
    const suburb = req.query.suburb;
    const numtweets = req.query.num;
    if (suburb && numtweets) {

        var error = function (err, response, body) {
            console.log('ERROR: [%s]', err);
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

router.get('/wiki', (req, res) => {
  wiki().page(req.query.sub)
        .then(function(response) {
          return Promise.all([
            response.info(),
            response.content(),
            response.summary()
          ])
        }).then(function(response) {
          res.json({
            info: response[0],
            content: response[1],
            summary: response[2]
          })
        }).catch(function(err) {
          console.log(err);
        });
  return;
})

router.get('/suburbs', (req, res) => {
  const collection = db.get().collection('suburb_names');
  collection.find().toArray((err, docs) => {
    res.json({ docs });
  });
})

app.use(router)

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.set('dburl', (process.env.DBURL || 'mongodb://localhost:27017/suburber'))

// connect to database
db.connect(app.get('dburl'), (err) => {
  if (err) {
    console.log('Unable to connect to database')
    process.exit(1)
  } else {
    app.listen(app.get('port'), () => {
      console.log(`Listening on ${app.get('port')}`)
    })
  }
});
