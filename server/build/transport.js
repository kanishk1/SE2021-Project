'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _db = require('./db.js');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/facility', function (req, res) {
  var collection = db.get().collection('transport');
  collection.findOne({ suburb: req.query.suburb }).then(function (doc) {
    if (doc) return doc;else return { "error": "no results" };
  }).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    return res.json({ "error": "" + err });
  });
});

exports.default = router;