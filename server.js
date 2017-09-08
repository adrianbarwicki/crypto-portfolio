var express = require('express')
var app = express()
var worker = require('./worker');
var routes = require('./routes');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.json());

routes.init(app);
worker.init();

app.listen(3001);
