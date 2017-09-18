import request from 'request'
import express from 'express';

const router = express.Router();

// ALL TODO
function doAPI() {
    return new Promise((success, fail) => {
        request(
        "http://stat.data.abs.gov.au/restsdmx/sdmx.ashx/GetDataStructure/ABS_C16_T01_LGA?pid=01d10e24-7886-4949-b0b2-c372a2266374",
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                success(body);
            } else {
                fail(error)
            }
        });
    });
}

// Census API
router.get('/search', function(req, res, next) {
  doAPI()
    .then(response => {
      res.set('Content-Type', 'text/xml');
      res.send(response);
    }).catch(fail => {
      console.log('error:', fail); // Print the error if one occurred
      res.send('Error: ' + fail);
    });
});

export default router;
