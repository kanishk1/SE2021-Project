import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import domain from './domain'
import places from './places'
import wiki from 'wikijs';
import * as db from './db'
import twitter from './twitter'
import weather from './openweather'
import bing from './bing'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

// Google Places API
router.get('/places/search', (req,res) => {
    const keyword = req.query.keyword;
    if(keyword){
        places(keyword)
            .then(data => res.end(data))
            .catch(err => res.send(err))
    }
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
app.use('/domain', domain);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)
app.use('/twitter',twitter)
app.use('/weather',weather)
app.use('/bing',bing)

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
