import express from 'express';
import bing from 'node-bing-api';
import * as db from './db.js';
import requestPromise from 'request-promise-native';

const router = express.Router();

function getResults(suburb, numResults) {
  if (!suburb || !numResults) {
    return Promise.reject('Invalid Parameters');
  }

  const apikey1 = '2e466941fe314289af733fa47696b09c';
  const apikey2 = '39937d23b2784b3584ce3252c1c11e44';

  return new Promise((success, err) => {
    bing({ accKey: apikey1 }).news(suburb, {
      count: numResults,
      market: 'en-AU',
      adult: 'Strict'
    }, (error, data, body) => {
      if (error)
        err(error);
      else {
        const results = [];
        for (const article of body['value']) {
          var result = {
              name:        article['name'],
              url:         article['url'],
              description: article['description'],
              publishDate: article['datePublished'],
              provider:    article['provider'][0]['name']
          }
          if (article['image']) {
            result.image = article['image']['thumbnail']; // provides url,width,height
            result.actualImage = article['image'];
          }
          results.push(result);
        }
        success(results);
      }
    });
  });
}

async function addImages(data) {
  if (!data) {
    return await Promise.reject('Invalid parameters');
  }
  var newData;
  var pFunctionArray = data.map((v) => {
    var options = {
      uri: "https://autocomplete.clearbit.com/v1/companies/suggest?query=" + v.provider,
      json: true
    }
    // dirty hardcode for smh
    if (v.provider === "Sydney Morning Herald") {
      options.uri = "https://autocomplete.clearbit.com/v1/companies/suggest?query=smh";
    }
    return (() => requestPromise(options));
  });

  return await Promise.all(pFunctionArray.map((pFn) => pFn()))
      .then(async function(logoData) {
        return await Promise.all(logoData.map(async(l, i) => {
          if (l.length > 0) {
            data[i].logoUrl = l[0].logo;
          } else {
            // var options = {
            //   uri: "http://api.img4me.com/?text=" + data[i].provider + "&font=arial&fcolor=FFFFFF&size=35&bcolor=000000&type=png"
            // }
            // data[i].logoUrl = await requestPromise(options).then((res) => res);
            data[i].logoUrl = "http://place-hold.it/200x100/000000/ffffff/?text=" + data[i].provider + "&bold&fontsize=16";
          }
          return data[i];
        }));
      });
};

// Example Call... http://localhost:3001/bing/search?suburb=hurstville&num=10
router.get('/search', (req, res) => {
  const suburb = req.query.suburb;
  db.data('bing', suburb, 'day', () => getResults(suburb, req.query.num))
    .then(data => addImages(data))
    .then(data => res.json(data))
    .catch(err => res.json({'error': '' + err}));
});

export default router;
