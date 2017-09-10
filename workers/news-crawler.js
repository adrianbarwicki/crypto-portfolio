const request = require('request');
const async = require('async');
const crawler = require('../crawler/cryptocoinnews');
const models = require('../models');

const crawlNews = cb => {
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
                console.error(err);

                if (!module.parent) {
                    return process.exit();
                } else {
                    return cb && cb(err);
                }
            }

            if (!module.parent) {
                process.exit();
            } else {
                return cb && cb();
            }
        });
    });
};

if (module.parent) {
    module.exports = crawlNews;
} else {
    crawlNews();
}

