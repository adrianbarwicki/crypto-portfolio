var express = require('express')
var app = express()
 
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.VQ_DB_HOST,
  user            : process.env.VQ_DB_USER,
  password        : process.env.VQ_DB_PW,
  database        : 'bitcoin'
});

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'))

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

app.get('/api/news/bitcoin', (req, res) => {
  pool.query('SELECT * FROM news', (error, results, fields) => {
    if (error) throw error;
    
    res.status(200).send(results);
  });
});


app.listen(3000)