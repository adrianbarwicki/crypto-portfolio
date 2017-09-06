var express = require('express')
var app = express()
 
var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 5,
  host            : process.env.VQ_DB_HOST,
  user            : process.env.VQ_DB_USER,
  password        : process.env.VQ_DB_PW,
  database        : 'bitcoin'
});

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'))
/*
app.get('/headlines/bitcoin', (req, res) => {
  pool.query('SELECT * FROM news', (error, data, fields) => {
    if (error) throw error;
    

    res.render('headlines.ejs', { data: data });
  });
});

app.get('/api/price/bitcoin', (req, res) => {
  pool.query('SELECT * FROM price', (error, results, fields) => {
    if (error) throw error;
    
    res.status(200).send(results);
  });
});
*/

app.get('/api/news', (req, res) => {
  pool.query('SELECT * FROM news ORDER BY time DESC', (error, results, fields) => {
    if (error) throw error;
    
    res.status(200).send(results);
  });
});

app.get('/api/portfolio', (req, res) => {
    pool.query('SELECT * FROM assetposition', (error, results, fields) => {
      if (error) throw error;
      
      const response = {};

      response.positions = results;
      response.total_value = results.reduce((sum, position) => sum + position.total_value, 0);
      response.initial_value = 5896 / 0.84;
      response.roi = 100 * (response['total_value'] - response['initial_value']) / response['initial_value']
      response.positions = results;

      res.status(200).send(response);
    });

    // res.send(require('./data.json'));
})

app.listen(3000)