import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Google Places
// Key: AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q

// Google Maps
// Key: AIzaSyAGYGaI7RcITTzVzSyxxUc-I-q5E4NZ0R8



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

app.get('/wikiapi', function(req, res, next) {
    request(
    "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json",
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

app.use(router)

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})

/*
qs: {
    locationID: '-33.8670522,151.1957362',
    radiusID: '500',
    api_key: 'AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q'
},
*/
