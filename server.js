var express = require('express')
var app = express()
var worker = require('./worker');
var models = require('./models');
var routes = require('./routes');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.json());

routes.init(app);
worker.init();

models.seq.sync()
    .then(() => {
        server = app.listen(3000, () => {
            var host = server.address().address;
            var port = server.address().port;

            console.log(`CryptoPortfolio listening at port ${port}`);
        });
    });

