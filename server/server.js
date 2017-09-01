import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

var request = require('request')
router.get('/users', function(req,res) {
  request('https://jsonplaceholder.typicode.com/users', function(error, response, body) {
    res.json(body)
  });
});

router.get('/hello', (req, res) => {
  const param = req.query.q;
  if (param) {
    res.json({
      name: param 
    });
    return;
  }
});

app.get('/test', function(req, res){
    res.send('hello world');
});

app.use(router)

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})
