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

var _db = require('./db.js');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// TODO: move auth tokens out of code?
var cred_A = {
  user: 'mzt6yh8t2ysh7kdtrpbda2cy',
  pass: 'tKSNGm4Ysh',
  scopes: ['addresslocators', 'suburbperformance', 'demographics'],
  token: null,
  expires: null
};

// TODO: move auth tokens out of code?
var cred_B = {
  user: 'pr7nycgdtyfw56ahvnpy9eyu',
  pass: '8USA7GAgzD',
  scopes: ['listings'],
  token: null,
  expires: null
};

var auth = {
  'addresslocators': cred_A,
  'suburbperformance': cred_A,
  'demographics': cred_A,
  'listings': cred_B
};

// TODO: work out what ids correspond to *exactly* what scopes, and just grab all of them
function getToken(scope) {
  if (!(scope in auth)) return _promise2.default.reject("Invalid scope");

  if (auth[scope].token && auth[scope].expires > Math.floor(Date.now() / 1000)) return _promise2.default.resolve(auth[scope].token);

  return new _promise2.default(function (success, reject) {
    (0, _request2.default)({
      url: 'https://auth.domain.com.au/v1/connect/token',
      method: 'POST',
      auth: {
        user: auth[scope].user,
        pass: auth[scope].pass
      },
      form: {
        'grant_type': 'client_credentials',
        'scope': auth[scope].scopes.map(function (x) {
          return 'api_' + x + '_read';
        }).join(' ')
      }
    }, function (err, res, body) {
      if (err) reject('' + err);else {
        console.log(body);
        var json = JSON.parse(body);
        auth[scope].token = json.access_token;
        auth[scope].expires = Math.floor(Date.now() / 1000) + json.expires_in;
        success(auth[scope].token);
      }
    });
  });
}

function get(scope, uri, post) {
  return getToken(scope).then(function (token) {
    var request_info = {
      url: uri,
      auth: {
        'bearer': token
      }
    };
    if (post) {
      request_info.method = 'POST';
      request_info.json = post;
    }

    return new _promise2.default(function (success, reject) {
      (0, _request2.default)(request_info, function (err, data, body) {
        if (err) reject('' + err);else success(typeof body == 'string' ? JSON.parse(body) : body);
      });
    });
  });
}

function addressID(suburb) {
  var url = 'https://api.domain.com.au/v1/addressLocators';
  var queries = ['suburb=' + suburb.split(' ').join('+'), 'state=NSW', 'searchLevel=Suburb'];

  return get('addresslocators', url + '?' + queries.join('&')).then(function (data) {
    return data[0].ids[0].id;
  });
}

function getHousing(suburb) {
  return addressID(suburb).then(function (id) {
    var url = 'https://api.domain.com.au/v1/suburbPerformanceStatistics';
    var queries = ['state=NSW', 'suburbID=' + id, 'propertyCategory=house', 'chronologicalSpan=12', 'tPlusFrom=1', 'tPlusTo=3'];
    return get('suburbperformance', url + '?' + queries.join('&'));
  });
};

function getDemographics(suburb) {
  return addressID(suburb).then(function (id) {
    var url = 'https://api.domain.com.au/v1/demographics';
    var queries = ['level=Suburb', 'id=' + id];
    return get('demographics', url + '?' + queries.join('&'));
  });
};

router.get('/housing', function (req, res) {
  var suburb = req.query.suburb;
  db.data('domain_housing', suburb, 'month', function () {
    return getHousing(suburb);
  }).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    return res.json({ 'error': '' + err });
  });
});

router.get('/demographics', function (req, res) {
  var suburb = req.query.suburb;
  db.data('domain_demographics', suburb, 'month', function () {
    return getDemographics(suburb);
  }).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    return res.json({ 'error': '' + err });
  });
});

router.get('/listings', function (req, res) {
  var uri = 'https://api.domain.com.au/v1/listings/residential/_search';
  var reqbody = {
    "listingType": "Sale",
    "minBedrooms": -1,
    "maxBedrooms": -1,
    "minBathrooms": -1,
    "maxBathrooms": -1,
    "minCarspaces": "",
    "maxCarspaces": "",
    "minPrice": "",
    "maxPrice": "",
    "minLandArea": "",
    "maxLandArea": "",
    "locationTerms": "",
    "keywords": ["" + req.query.suburb],
    "inspectionFrom": "",
    "inspectionTo": "",
    "auctionFrom": "",
    "auctionTo": "",
    "sort": {
      "sortKey": "",
      "proximityTo": {
        "lat": -1,
        "lon": -1
      }
    },
    "page": "",
    "pageSize": "",
    "geoWindow": {
      "box": {
        "topLeft": {
          "lat": -1,
          "lon": -1
        },
        "bottomRight": {
          "lat": -1,
          "lon": -1
        }
      },
      "circle": {
        "center": {
          "lat": -1,
          "lon": -1
        },
        "radiusInMeters": ""
      },
      "polygon": {}
    }
  };
  get('listings', uri, reqbody).then(function (data) {
    var newdata = [];
    data.forEach(function (element, i) {
      if (data[i].type == "PropertyListing") {
        var houseEntry = {
          "price": data[i]["listing"]["priceDetails"]["displayPrice"],
          "media": data[i]["listing"]["media"][0],
          "address": data[i]["listing"]["propertyDetails"]["displayableAddress"],
          "bathrooms": data[i]["listing"]["propertyDetails"]["bathrooms"],
          "bedrooms": data[i]["listing"]["propertyDetails"]["bedrooms"],
          "carspaces": data[i]["listing"]["propertyDetails"]["carspaces"]
        };
        newdata.push(houseEntry);
      }
    });
    res.json(newdata);
  }).catch(function (err) {
    return res.send(err);
  });
});

exports.default = router;