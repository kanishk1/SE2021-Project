import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

var request = require('request')

app.get('/api', function(req, res, next) {

    request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q", function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   console.log('body:', body); // Print the HTML for the Google homepage.
    //   res.json(body);
      res.send(body);
    });
  // request({
  //   method: "GET",
  //   url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q",
  //   function(error, response, body) {
  //     if (!error && response.statusCode === 200) {
  //       console.log(body);
  //       res.json(body);
  //       res.send(body);
  //       res.send('hello world');
  //     } else {
  //       res.json(error);
  //     }
  //   }
  // });
});

// router.get('/hello', (req, res) => {
//   const param = req.query.q;
//   if (param) {
//     res.json({
//       name: param
//     });
//     // console.log("hello world");
//     return;
//   }
// });

// app.get('/test', function(req, res){
//     var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//  console.log('error:', error); // Print the error if one occurred
//  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//  console.log('body:', body); // Print the HTML for the Google homepage.
// });
// });

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
