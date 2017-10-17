'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// ALL TODO
function doAPI() {
    return new _promise2.default(function (success, fail) {
        (0, _request2.default)("http://stat.data.abs.gov.au/restsdmx/sdmx.ashx/GetDataStructure/ABS_C16_T01_LGA?pid=01d10e24-7886-4949-b0b2-c372a2266374", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                success(body);
            } else {
                fail(error);
            }
        });
    });
}

// Census API
router.get('/search', function (req, res, next) {
    doAPI().then(function (response) {
        res.set('Content-Type', 'text/xml');
        res.send(response);
    }).catch(function (fail) {
        console.log('error:', fail); // Print the error if one occurred
        res.send('Error: ' + fail);
    });
});

exports.default = router;