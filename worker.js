const priceCrawler = require('./workers/price-crawler');
const newsCrawler = require('./workers/news-crawler');

var running = {
    news: false,
    prices: false
};

const runWorker = () => {
    if (!running.news) {
        running.news = true;

        newsCrawler(() => {
            console.log('[WORKER] News crawler finished');

            running.news = false;
        });
    }
    
    if (!running.prices) {
        running.prices = true;

        priceCrawler(() => {
            console.log('[WORKER] Price crawler finished');

            running.prices = false;
        });
    }
};

const init = () => {
    setInterval(() => {
        runWorker();
    }, 60 * 1000);
};

if (module.parent) {
    module.exports = {
        init
    };
} else {
    runWorker();
}



