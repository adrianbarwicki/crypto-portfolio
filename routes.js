const mysql = require('mysql');

const models = require('./models');

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
      
    app.get('/api/portfolio/:id', (req, res) => {
        models.portfolio.findOne({
            where: {
                id: req.params.id
            }
        }).then(rPortfolio => {
            models.assetPosition.findAll({
                include: [{
                    model: models.priceTicker
                }]
            })
            .then(results => {
                results = JSON.parse(JSON.stringify(results));
    
                const portfolio = {
                    initial_value: rPortfolio.initialValue / 0.84,
                    total_value: 0,
                    roi: 0,
                    positions: []
                };
    
                portfolio.positions = results
                .filter(result => result.amount)
                .map(result => {
                    result.total_value = result.priceTicker.price_usd * result.amount;
    
                    portfolio.total_value += result.total_value;
    
                    return result;
                });
                
                portfolio.positions = portfolio.positions
                .map(result => {
                    result.rel_value = 100 * (result.total_value / portfolio.total_value);
                    result.rel_value = result.rel_value.toFixed(2);
    
                    return result;
                });
    
                portfolio.roi = 100 * (portfolio.total_value - portfolio.initial_value) / portfolio.initial_value;
    
                res.status(200)
                .send(portfolio);
            });
        });
    });

    app.get('/api/price-tickers', (req, res) => {
        models.priceTicker.findAll()
        .then(results => {
            res.status(200).send(results);
        });
    });

    app.get('/api/price-ticker/:ticker', (req, res) => {
        const ticker = req.params.ticker;

        models.assetPosition
            .findOne({
                where: {
                    priceTickerId: ticker
                }
            })
            .then(result => {
                res.status(200).send(result);
            });
    });

    app.put('/api/price-ticker/:ticker', (req, res) => {
        const amount = req.body.amount;
        const ticker = req.params.ticker;

        models.assetPosition
            .findOne({
                where: {
                    priceTickerId: ticker
                }
            })
            .then(result => {
                result.update({
                    amount
                });

                res.status(200).send(result);
            });
    });
};

module.exports = {
    init
};
