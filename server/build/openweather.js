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

var _nodeOpenweather = require('node-openweather');

var _nodeOpenweather2 = _interopRequireDefault(_nodeOpenweather);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var FORECASTS_PER_DAY = 24 / 3;

function getWeather(postcode) {
  var country = 'Australia';

  if (!postcode) {
    return _promise2.default.reject('Invalid Parameters');
  }

  var weather = (0, _nodeOpenweather2.default)({
    key: 'aa69bf79cee1f390f63d8203bd191e3b',
    accuracy: "like",
    units: "metric",
    language: "en"
  });

  // disable console.log because openweather annoys me
  var logger = console.log;
  console.log = function () {};

  var promise = weather.zip(postcode, country).forecast(5);

  console.log = logger; // re-enable it now ;)

  return promise.then(function (result) {
    var values = [];

    var min = +1e99;var min_dt = null;
    var max = -1e99;var max_dt = null;
    var humidity = 0;
    var conditions = "Hello";

    var num_forecasts_inspected = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(result['list']), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var forecast = _step.value;

        if (num_forecasts_inspected === 0) {
          conditions = forecast['weather'][0]['description'];
        }

        if (forecast['main']['temp'] > max) {
          max = forecast['main']['temp'];
          max_dt = new Date((forecast['dt'] + 36000) * 1000);
        }
        if (forecast['main']['temp'] < min) {
          min = forecast['main']['temp'];
          min_dt = new Date((forecast['dt'] + 36000) * 1000);
        }
        humidity += forecast['main']['humidity'];

        if (++num_forecasts_inspected >= FORECASTS_PER_DAY) {
          humidity /= num_forecasts_inspected;
          values.push({ min: min, min_dt: min_dt, max: max, max_dt: max_dt, humidity: humidity, conditions: conditions });

          min = +1e99;
          max = -1e99;
          humidity = 0;
          num_forecasts_inspected = 0;
        }
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

    if (num_forecasts_inspected > FORECASTS_PER_DAY / 2) {
      humidity /= num_forecasts_inspected;
      values.push({ min: min, min_dt: min_dt, max: max, max_dt: max_dt, humidity: humidity, conditions: conditions });
    }

    return values;
  });
}

router.get('/:postcode', function (req, res) {
  getWeather(req.params.postcode).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    return res.json({ 'error': '' + err });
  });
});

exports.default = router;