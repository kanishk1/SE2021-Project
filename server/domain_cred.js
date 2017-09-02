import request from 'request';

const token = {
  auth: null,
  expires: null
}

// DOMAIN API CALL
/*
Note there are two sets of credentials so if one doesn't work use the other..
client_id: 'pr7nycgdtyfw56ahvnpy9eyu',
client_secret: '8USA7GAgzD',
client_id2: 'mzt6yh8t2ysh7kdtrpbda2cy',
client_secret2: 'tKSNGm4Ysh'
*/

export default function getToken() {
  return new Promise((success, reject) => {
    if (token.auth && token.expires > Math.floor(Date.now() / 1000))
      success(token.auth);
    else {
      // TODO: move auth tokens out of code?
      request({
        url: 'https://auth.domain.com.au/v1/connect/token',
        method: 'POST',
        auth: {
          user: 'pr7nycgdtyfw56ahvnpy9eyu',
          pass: '8USA7GAgzD'
        },
        form: {
          'grant_type': 'client_credentials',
          'scope': 'api_listings_read'
        }
      }, (err, res) => {
        if (err)
          reject(err);
        else {
          const json = JSON.parse(res.body);
          token.auth = json.access_token;
          token.expires = Math.floor(Date.now() / 1000) + json.expires_in;
          success(token.auth);
        }
      });
    }
  });
}
