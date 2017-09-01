import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import wiki from 'wikijs';
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

router.get('/wiki', (req, res) => {

  wiki().page(req.query.sub)
        .then(function(response) {
          return Promise.all([
            response.info(),
            response.content(),
            response.summary()
          ])
        }).then(function(response) {
          res.json({
            info: response[0],
            content: response[1],
            summary: response[2]
          })
        }).catch(function(err) {
          console.log(err);
        });
  return;
})

app.use(router)

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})
