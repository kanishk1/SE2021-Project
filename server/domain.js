import request from 'request';
import express from 'express';

const router = express.Router();

// TODO: move auth tokens out of code?
const cred_A = {
  user: 'mzt6yh8t2ysh7kdtrpbda2cy',
  pass: 'tKSNGm4Ysh',
  scopes: ['addresslocators', 'suburbperformance'],
  token: null,
  expires: null
};

// TODO: move auth tokens out of code?
const cred_B = {
  user: 'pr7nycgdtyfw56ahvnpy9eyu',
  pass: '8USA7GAgzD',
  scopes: ['listings'],
  token: null,
  expires: null
};

const auth = {
  'addresslocators': cred_A,
  'suburbperformance': cred_A,
  'listings': cred_B
};

// TODO: work out what ids correspond to *exactly* what scopes, and just grab all of them
function getToken(scope) {
  if (!(scope in auth))
    return Promise.reject("Invalid scope");

  if (auth[scope].token && auth[scope].expires > Math.floor(Date.now() / 1000))
    return Promise.resolve(auth[scope].token);

  return new Promise((success, reject) => {
    request({
      url: 'https://auth.domain.com.au/v1/connect/token',
      method: 'POST',
      auth: {
        user: auth[scope].user,
        pass: auth[scope].pass
      },
      form: {
        'grant_type': 'client_credentials',
        'scope': auth[scope].scopes.map(x => 'api_' + x + '_read').join(' ')
      }
    }, (err, res, body) => {
      if (err)
        reject(err);
      else {
        console.log(body);
        const json = JSON.parse(body);
        auth[scope].token = json.access_token;
        auth[scope].expires = Math.floor(Date.now() / 1000) + json.expires_in;
        success(auth[scope].token);
      }
    });
  });
}

function get(scope, uri, post) {
  return getToken(scope)
    .then(token => {
      const request_info = {
        url: uri,
        auth: {
          'bearer': token
        }
      };
      if (post) {
        request_info.method = 'POST';
        request_info.json = post;
      }

      return new Promise((success, reject) => {
        request(request_info, (err, data, body) => {
          if (err)
            reject(data);
          else
            success(JSON.parse(body));
        });
      });
    });
} 

router.get('/housing', (req, res) => {
  // We need to get the Suburb address value first...
  const suburb = req.query.suburb;
  const suburbquery = 'suburb=' + suburb.split(' ').join('+') + '&';
  const statequery = 'state=NSW';
  const searchlevel = '?searchLevel=Suburb&'
  const totalQuery = 'https://api.domain.com.au/v1/addressLocators' + searchlevel + suburbquery + statequery;
  console.log(totalQuery)
  get('addresslocators', totalQuery)
    .then(data => {
      const id = data[0].ids[0].id;
      const api = 'https://api.domain.com.au/v1/suburbPerformanceStatistics?';
      const queries = [
        statequery,
        'suburbID=' + id,
        'propertyCategory=house',
        'chronologicalSpan=12',
        'tPlusFrom=1',
        'tPlusTo=3'
      ];
      return get('suburbperformance', api+queries.join('&'));
    })
    .then(data => res.json(data))
    .catch(err => res.send(err));
});

export default router;
