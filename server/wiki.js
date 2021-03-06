import wiki from 'wikijs';
import express from 'express';
import * as db from './db.js';

const router = express.Router();

function doAPI(suburb) {
  // Hardcoded to NSW for now, maybe change later
  var actualSearchParam = suburb + ',_New_South_Wales';
  return wiki().page(actualSearchParam)
    .then((response) => {
      return Promise.all([
        response.info(),
        response.content(),
        response.summary()
      ])
    }).then((response) => {
      return {
        info: response[0],
        content: response[1],
        summary: response[2]
      };
    });
}

router.get('/search', (req, res) => {
  const suburb = req.query.suburb
  db.data('wiki', suburb, 'week', () => doAPI(suburb))
    .then(success => res.json(success))
    .catch(fail => {
      console.log(fail);
      res.json({'error': '' + fail});
    });
});

export default router;


