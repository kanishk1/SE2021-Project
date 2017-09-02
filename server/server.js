import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import domain from './domain_cred'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router()

router.get('/hello', (req, res) => {
  const param = req.query.q;
  if (param) {
    res.json({
      name: param
    });
    return;
  }
});

// test for GET requests
router.get('/domain/get/:id', (req, res) => {
  domain('https://api.domain.com.au/v1/listings/' + req.params.id)
    .then(data => res.json(data))
    .catch(err => res.end(JSON.stringify(err)));
});

// test for POST requests
import test_form from './test_form.json'
router.get('/domain/search', (req, res) => {
  domain('https://api.domain.com.au/v1/listings/_search', test_form)
    .then(data => res.json(data))
    .catch(err => res.end(JSON.stringify(err)));
});

app.get('/test', function(req, res){
    res.send('hello world');
});

app.use(router)

// any routes not picked up by the server api will be handled by the react router
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})
