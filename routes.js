const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit: 5,
  host: process.env.VQ_DB_HOST,
  user: process.env.VQ_DB_USER,
  password: process.env.VQ_DB_PW,
  database: 'bitcoin'
});

const init = app => {
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
            response.initial_value = 5996 / 0.84;
            response.roi = 100 * (response['total_value'] - response['initial_value']) / response['initial_value']
            response.positions = results;

            res.status(200).send(response);
        });
    });

    app.get('/api/asset/:ticker', (req, res) => {
        const ticker = req.params.ticker;

        pool.query('SELECT * FROM assetposition WHERE ticker=?', [
            ticker
        ], (error, results, fields) => {
            if (error) throw error;
            
            if (!results.length) {
                res
                .status(404)
                .send();
            }

            res.status(200).send(results[0]);
        });
    });

    app.put('/api/asset/:ticker', (req, res) => {
        const amount = req.body.amount;
        const ticker = req.params.ticker;

        pool.query('UPDATE assetposition SET amount=? WHERE ticker=?', [
            amount,
            ticker
        ], (error, results, fields) => {
            if (error) throw error;
            
            res.status(200).send(results);
        });
    });
};

module.exports = {
    init
};
