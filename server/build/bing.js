'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nodeBingApi = require('node-bing-api');

var _nodeBingApi2 = _interopRequireDefault(_nodeBingApi);

var _db = require('./db.js');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function getResults(suburb, numResults) {
  if (!suburb || !numResults) {
    return _promise2.default.reject('Invalid Parameters');
  }

  var apikey1 = '2e466941fe314289af733fa47696b09c';
  var apikey2 = '39937d23b2784b3584ce3252c1c11e44';

  return new _promise2.default(function (success, err) {
    (0, _nodeBingApi2.default)({ accKey: apikey1 }).news(suburb, {
      count: numResults,
      market: 'en-AU',
      adult: 'Strict'
    }, function (error, data, body) {
      if (error) err(error);else {
        var results = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(body['value']), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var article = _step.value;

            var result = {
              name: article['name'],
              url: article['url'],
              description: article['description'],
              publishDate: article['datePublished'],
              provider: article['provider'][0]['name']
            };
            if (article['image']) {
              result.image = article['image']['thumbnail']; // provides url,width,height
              result.actualImage = article['image'];
            }
            results.push(result);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        success(results);
      }
    });
  });
}

// Example Call... http://localhost:3001/bing/search?suburb=hurstville&num=10
router.get('/search', function (req, res) {
  var suburb = req.query.suburb;
  db.data('bing', suburb, 'day', function () {
    return getResults(suburb, req.query.num);
  }).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    return res.json({ 'error': '' + err });
  });
});

exports.default = router;