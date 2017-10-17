'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _domain = require('./domain');

var _domain2 = _interopRequireDefault(_domain);

var _places = require('./places');

var _places2 = _interopRequireDefault(_places);

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _twitter = require('./twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _openweather = require('./openweather');

var _openweather2 = _interopRequireDefault(_openweather);

var _bing = require('./bing');

var _bing2 = _interopRequireDefault(_bing);

var _census = require('./census');

var _census2 = _interopRequireDefault(_census);

var _wiki = require('./wiki');

var _wiki2 = _interopRequireDefault(_wiki);

var _transport = require('./transport');

var _transport2 = _interopRequireDefault(_transport);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

var router = _express2.default.Router();

var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../client/build'));
app.use(staticFiles);

router.get('/suburbs', function (req, res) {
  var collection = db.get().collection('suburb_names');
  collection.find().toArray(function (err, docs) {
    res.json({ docs: docs });
  });
});

app.use(router);
app.use('/domain', _domain2.default);
app.use('/twitter', _twitter2.default);
app.use('/weather', _openweather2.default);
app.use('/bing', _bing2.default);
app.use('/places', _places2.default);
app.use('/census', _census2.default);
app.use('/wiki', _wiki2.default);
app.use('/transport', _transport2.default);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);
app.set('dburl', process.env.DBURL || 'mongodb://localhost:27017/suburber');

// connect to database
db.connect(app.get('dburl'), function (err) {
  if (err) {
    console.log('Unable to connect to database');
    process.exit(1);
  } else {
    app.listen(app.get('port'), function () {
      console.log('Listening on ' + app.get('port'));
    });
  }
});