import express from 'express';
import bing from 'node-bing-api';
import * as db from './db.js';

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
});

// Example Call... http://localhost:3001/bing/search?suburb=hurstville&num=10
router.get('/search', (req, res) => {
  const suburb = req.query.suburb;
  db.data('bing', suburb, 'day', () => getResults(suburb, req.query.numResults))
    .then(data => res.json(data)
    .catch(err => res.json({'error': '' + err});
});

export default router;
