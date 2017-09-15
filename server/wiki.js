import wiki from 'wikijs';
import express from 'express';

const router = express.Router();

function doAPI(suburb) {
    return new Promise((success, fail) => {
        wiki().page(suburb)
            .then(function(response) {
              return Promise.all([
                response.info(),
                response.content(),
                response.summary()
              ])
            }).then(function(response) {
              success({
                info: response[0],
                content: response[1],
                summary: response[2]
              })
            }).catch(function(err) {
              fail(err);
            });
    });
}

router.get('/wiki', (req, res) => {
  const suburb = req.query.suburb
  if (suburb) {
    doAPI(suburb)
      .then(success => res.json(success))
      .catch(fail => console.log(fail))
  }
});

export default router;
      
      
