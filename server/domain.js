import request from 'request';

// TODO: move auth tokens out of code?
const cred_A = {
  user: 'mzt6yh8t2ysh7kdtrpbda2cy',
  pass: 'tKSNGm4Ysh',
  token: null,
  expires: null
};

// TODO: move auth tokens out of code?
const cred_B = {
  user: 'pr7nycgdtyfw56ahvnpy9eyu',
  pass: '8USA7GAgzD',
  token: null,
  expires: null
};

const auth = {
  'addresslocators': cred_A,
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
        'scope': 'api_' + scope + '_read'
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

export default function doAPI(scope, uri, post) {
  return new Promise((success, reject) => {
    getToken(scope)
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

        request(request_info, (err, data, body) => {
          if (err)
            reject(err);
          else
            success(JSON.parse(body));
        });
      })
      .catch(err => reject(err));
  });
}
