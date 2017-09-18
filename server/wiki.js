import wiki from 'wikijs';
import express from 'express';

const router = express.Router();

function doAPI(suburb) {
  return wiki().page(suburb)
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
  doAPI(suburb)
    .then(success => res.json(success))
    .catch(fail => res.send("Error: " + fail))
});

export default router;


