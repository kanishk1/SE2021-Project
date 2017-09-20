import express from 'express';
import bing from 'node-bing-api';

const router = express.Router();

// Example Call... http://localhost:3001/bing/search?suburb=hurstville&num=10
router.get('/search', (req, res) => {
  const suburb = req.query.suburb;
  const numResults = req.query.num;

  if (!suburb || !numResults) {
    res.send("Error: Invalid Parameters");
    return;
  }

  const apikey1 = '2e466941fe314289af733fa47696b09c';
  const apikey2 = '39937d23b2784b3584ce3252c1c11e44';
  bing({ accKey: apikey1 }).news(suburb, {
    count: numResults,
    market: 'en-AU',
    adult: 'Strict'
  }, (error, data, body) => {
    if (error)
      res.send("Error: " + error);
    else {
      const results = [];
      for (const article of body['value']) {
        results.push({
          name:        article['name'],
          url:         article['url'],
          image:       article['image']['thumbnail'], // provides url,width,height
          description: article['description'],
          publishDate: article['datePublished'],
          category:    article['category'] // won't always get this
        });
      }
      res.json(results);
    }
  });
});

export default router;
