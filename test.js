var request = require('request');


request("https://www.google.com.au/search?q=rosebery&source=lnms&tbm=isch&sa=X&biw=1366&bih=662", function(error, response, body) { console.log(body); })
