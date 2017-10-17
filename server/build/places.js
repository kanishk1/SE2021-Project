'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function doAPI(keyword) {
    if (!keyword) return _promise2.default.reject("Invalid parameters");

    return new _promise2.default(function (success, reject) {
        (0, _request2.default)({
            url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + keyword + "&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q",
            method: 'GET'
        }, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                success(body);
            } else {
                console.log('error:', err);
                reject((0, _stringify2.default)(err));
            }
        });
    });
}

// Google Places API
router.get('/search', function (req, res) {
    var keyword = req.query.keyword;
    doAPI(keyword).then(function (data) {
        return res.end(data);
    }).catch(function (err) {
        return res.json({ error: '' + err });
    });
});

exports.default = router;