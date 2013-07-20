var express = require('express');
var app = express();
var home = require('./controllers/home');

app.configure(function () {

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(app.router);
  app.use("/public", express.static(__dirname + '/public'));
});

// app.get('/', function(req, res){
//   var body = 'Hello World';
//   res.setHeader('Content-Type', 'text/plain');
//   res.setHeader('Content-Length', body.length);
//   res.end(body);
// });
app.get('/', home.handleGet);

app.listen(3000);
console.log('Listening on port 3000');
