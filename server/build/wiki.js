'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _wikijs = require('wikijs');

var _wikijs2 = _interopRequireDefault(_wikijs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _db = require('./db.js');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function doAPI(suburb) {
  // Hardcoded to NSW for now, maybe change later
  var actualSearchParam = suburb + ',_New_South_Wales';
  return (0, _wikijs2.default)().page(actualSearchParam).then(function (response) {
    return _promise2.default.all([response.info(), response.content(), response.summary()]);
  }).then(function (response) {
    return {
      info: response[0],
      content: response[1],
      summary: response[2]
    };
  });
}

router.get('/search', function (req, res) {
  var suburb = req.query.suburb;
  db.data('wiki', suburb, 'week', function () {
    return doAPI(suburb);
  }).then(function (success) {
    return res.json(success);
  }).catch(function (fail) {
    console.log(fail);
    res.json({ 'error': '' + fail });
  });
});

exports.default = router;