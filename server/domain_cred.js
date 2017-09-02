import request from 'request';

const auth = {
  token: null,
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

function getToken() {
  return new Promise((success, reject) => {
    if (auth.token && auth.expires > Math.floor(Date.now() / 1000))
      success(auth.token);
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
          reject(JSON.stringify(err));
        else {
          const json = JSON.parse(res.body);
          auth.token = json.access_token;
          auth.expires = Math.floor(Date.now() / 1000) + json.expires_in;
          success(auth.token);
        }
      });
    }
  });
}

export default function doAPI(uri, post) {
  return new Promise((success, reject) => {
    getToken()
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

        request(request_info, (err, data) => {
          if (err)
            reject(JSON.stringify(err));
          else
            success(data)
        });
      })
      .catch(err => reject(err));
  });
}
