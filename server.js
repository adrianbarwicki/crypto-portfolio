var express = require('express')
var app = express()
var worker = require('./worker');
var routes = require('./routes');

app.set('view engine', 'ejs');

app.use(express.static('public'))

routes.init(app);
worker.init();

app.listen(3000);
