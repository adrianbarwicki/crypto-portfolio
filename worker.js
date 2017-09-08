const priceCrawler = require('./workers/price-crawler');
const newsCrawler = require('./workers/news-crawler');

var running;

const runWorker = () => {
    setTimeout(() => newsCrawler(), 1000);
    setTimeout(() => priceCrawler(), 1000 * 5);
};

const init = () => {
    setInterval(() => {
        if (running) {
            return;
        }

        runWorker();
    }, 30 * 1000);
};

if (module.parent) {
    module.exports = {
        init
    };
} else {
    runWorker();
}



