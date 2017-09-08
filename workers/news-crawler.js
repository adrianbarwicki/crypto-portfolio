const request = require('request');
const async = require('async');
const crawler = require('../crawler/cryptocoinnews');
const models = require('../models');

const crawlNews = () => {
    crawler.scrape((err, newses) => {
        async.eachLimit(newses, 2, (news, cb) => {
            models
            .news
            .upsert(news, {
                title: news.title
            })
            .then(_ => cb(), cb);
        }, err => {
            if (err) {
                return console.error(err);

                if (!module.parent) {
                    process.exit();
                }
            }

            if (!module.parent) {
                process.exit();
            }
        });
    });
};

if (module.parent) {
    module.exports = crawlNews;
} else {
    crawlNews();
}

