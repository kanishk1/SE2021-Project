import express from 'express';
import * as db from './db.js';

const router = express.Router();

router.get('/facility', (req, res) => {
  const collection = db.get().collection('transport');
  collection.findOne({ suburb: req.query.suburb })
    .then(doc => {
      if (doc) return doc;
      else return { "error": "no results" };
    })
    .then(data => res.json(data))
    .catch(err => res.json({ "error": "" + err }));
});

export default router;
