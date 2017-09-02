import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

// DOMAIN API CALL
/*
Note there are two sets of credentials so if one doesn't work use the other..
client_id: 'pr7nycgdtyfw56ahvnpy9eyu',
client_secret: '8USA7GAgzD',
client_id2: 'mzt6yh8t2ysh7kdtrpbda2cy',
client_secret2: 'tKSNGm4Ysh'
*/


// Problem -- I have no fcking idea how to implement domain api call, let alone authenticate
// installed a OAuth2 wrapper to help me out but still getting issues
// I hate javascript and web development

var ClientOAuth2 = require('client-oauth2')
var domainAuth = new ClientOAuth2({
    clientId: 'pr7nycgdtyfw56ahvnpy9eyu',
    clientSecret: '8USA7GAgzD',
    authorizationUri: 'https://auth.domain.com.au/v1/connect/token',
    scopes: ['api_addresslocators_read'] 
});


//var request = require('request')
router.get('/auth/domain', function(req,res) {
  var uri = domainAuth.code.getUri()
  console.log(uri)
  res.redirect(uri)
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
