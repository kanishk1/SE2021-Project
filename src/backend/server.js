const path = require('path');
const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'build')));
}

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/build/index.html');
});

app.get("/hello", (req, res) => {
  const param = req.query.q;
  if (param) {
    res.json({
      name: param
    });
    return;
  }
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
