const assetPositions = [
    [ 'qtum', 174.68245940 ],
    [ 'lisk', 164.96694652 ],
    [ 'monaco', 62.37464931 ],
    [ 'tenx', 13.64695279 ],
    [ 'ethereum', 0.2959 ],
    [ 'patientory', 50.00000000 ],
    [ 'blockchain-index', 416.125239 ],
    [ 'litecoin', 0.286 ],
    [ 'iota', 640.93903868 ],
    [ 'iconomi', 33.08107689 ],
    [ 'stratis', 0 ],
    [ 'storj', 452.56260124 ],
    [ 'neo', 0 ],
    [ 'zcash', 0.62964194 ],
    [ 'civic', 289.79909129 ],
    [ 'legends-room', 148.95669071 ],
    [ 'nav-coin', 111.86971722 ],
    [ 'waves', 30.06769465 ],
    [ 'siacoin', 11470.32875571 ],
    [ 'decred', 1.62276111 ],
    [ 'gamecredits', 26.61510377 ],
    [ 'district0x', 3554.545 ],
    [ 'lunyr', 3.35553727 ],
    [ 'particl', 1 ]
];

const request = require('request');
const async = require('async');
const models = require('../models');

async.eachLimit(assetPositions, 10, (assetPosition, cb) => {
    models
    .assetPosition
    .upsert({
        priceTickerId: assetPosition[0],
        amount: assetPosition[1]
    }, {
        priceTickerId: assetPosition[0]
    })
    .then(_ => cb(), cb);
}, err => {
    if (err) {
        return console.error(err);

        if (!module.parent) {
            process.exit();
        }
    }

    console.log(`Updated ${assetPositions.length} positions`);

    if (!module.parent) {
        process.exit();
    }
});
