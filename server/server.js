import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import * as db from './db'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

router.get('/hello', (req, res) => {
  const param = req.query.q;
  if (param) {
    res.json({
      name: param
    });
    return;
  }
})

router.get('/suburbs', (req, res) => {
  const collection = db.get().collection('suburb_names');
  collection.find().toArray((err, docs) => {
    res.json({ docs });
  });
})

app.use(router)

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.set('dburl', (process.env.DBURL || 'mongodb://localhost:27017/suburber'))

// connect to database
db.connect(app.get('dburl'), (err) => {
  if (err) {
    console.log('Unable to connect to database')
    process.exit(1)
  } else {
    app.listen(app.get('port'), () => {
      console.log(`Listening on ${app.get('port')}`)
    })
  }
});
