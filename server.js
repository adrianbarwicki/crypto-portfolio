var express = require('express')
var app = express()
 
app.use(express.static('public'))

app.get('/api/news/bitcoin', function (req, res) {
  res.sendFile(__dirname + '/data/bitcoin-news.json');
});
 
app.listen(3000)