import requests
from pyquery import PyQuery
import json

def crawl_cryptocoinnews(ticker):
    url = 'https://coinmarketcap.com/currencies/' + ticker

    headers = { 'Accept-Encoding': 'identity' }

    articles = []
    no_of_news = 0

    r = requests.get(url, headers=headers)

    pq = PyQuery(r.text)
    priceTag = pq('span#quote_price').text()

    return float(priceTag[1:])

myAssets = [
    [ 'patientory', 50.00000000 ],
    [ 'blockchain-index', 416.125239 ],
    [ 'ethereum', 0.3621 ],
    [ 'litecoin', 0.286 ],
    [ 'iota', 640.93903868 ],
    [ 'iconomi', 33.08107689 ],
    [ 'lisk', 113.98892433 ],
    [ 'qtum', 56.15498832 ],
    [ 'stratis', 73.50000000 ],
    [ 'storj', 702.56260124 ],
    [ 'monaco', 54.37464931 ],
    [ 'neo', 15.41751707 ],
    [ 'zcash', 1.22964194 ],
    [ 'civic', 599.79909129 ],
    [ 'legends-room', 148.95669071 ],
    [ 'nav-coin', 111.86971722 ],
    [ 'waves', 30.06769465 ],
    [ 'siacoin', 11470.32875571 ],
    [ 'decred', 1.62276111 ],
    [ 'gamecredits', 26.61510377 ],
    [ 'district0x', 3554.545 ],
    [ 'tenx', 13.64695279 ],
    [ 'lunyr', 3.35553727 ],
    [ 'particl', 1 ]
]

response = {
    'totalValue': 0,
    'positions': []
}

totalSum = 0
prices = {}
assetAmounts = {}

for asset in myAssets:
    price = crawl_cryptocoinnews(asset[0])
    assetAmounts[asset[0]] = price * asset[1]

    response['positions'].append({
        'ticker': asset[0],
        'price': price,
        'amount': asset[1],
        'totalValue': assetAmounts[asset[0]]
    })

    print str(asset[0]) + ': $' + str(assetAmounts[asset[0]])

    totalSum = totalSum + assetAmounts[asset[0]]

response['totalValue'] = totalSum

response['initialValue'] = 5896 / 0.84

response['roi'] = 100 * (response['totalValue'] - response['initialValue']) / response['initialValue']

for asset in myAssets:
    print str(asset[0]) + ': $' + str(assetAmounts[asset[0]]) + ' (' +str(100 * assetAmounts[asset[0]] / totalSum) + '%)'


with open('data.json', 'w') as outfile:
    json.dump(response, outfile)
