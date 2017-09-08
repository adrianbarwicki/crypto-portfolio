const request = require('request');
const async = require('async');
const models = require('../models');

const crawlPrices = () => {
    request
    .get('https://api.coinmarketcap.com/v1/ticker/', (err, response, body) => {
        const tickers = JSON.parse(body);

        async.eachLimit(tickers, 10, (ticker, cb) => {
            models
            .priceTicker
            .upsert(ticker, {
                id: ticker.id
            })
            .then(_ => cb(), cb);
        }, err => {
            if (err) {
                return console.error(err);

                if (!module.parent) {
                    process.exit();
                }
            }

            console.log(`Updated ${tickers.length} tickers`);

            if (!module.parent) {
                process.exit();
            }
        });
    });
}

if (module.parent) {
    module.exports = crawlPrices;
} else {
    crawlPrices();
}

