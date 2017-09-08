import requests
from pyquery import PyQuery
import json

def crawl_tickers():
    url = 'https://api.coinmarketcap.com/v1/ticker/'

    r = requests.get(url)

    jsonObject = r.json()

    return jsonObject

def crawl_asset_position(ticker):
    url = 'https://coinmarketcap.com/currencies/' + ticker

    headers = { 'Accept-Encoding': 'identity' }

    articles = []
    no_of_news = 0

    r = requests.get(url, headers=headers)

    pq = PyQuery(r.text)
    priceTag = pq('span#quote_price').text()

    return float(priceTag[1:])

def crawl_asset_positions():
    myAssets = [
        [ 'qtum', 139.88659804 ],
        [ 'lisk', 164.96694652 ],
        [ 'monaco', 62.37464931 ],
        [ 'tenx', 13.64695279 ],
        [ 'ethereum', 1.8468 ],

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
    ]

    response = {
        'total_value': 0,
        'positions': []
    }

    totalSum = 0
    prices = {}
    assetAmounts = {}

    for asset in myAssets:
        price = crawl_asset_position(asset[0])
        assetAmounts[asset[0]] = price * asset[1]

        response['positions'].append({
            'ticker': asset[0],
            'price': price,
            'amount': asset[1],
            'total_value': assetAmounts[asset[0]]
        })

        print str(asset[0]) + ': $' + str(assetAmounts[asset[0]])

        totalSum = totalSum + assetAmounts[asset[0]]

    for asset in myAssets:
        print str(asset[0]) + ': $' + str(assetAmounts[asset[0]]) + ' (' +str(100 * assetAmounts[asset[0]] / totalSum) + '%)'


    with open('data.json', 'w') as outfile:
        json.dump(response, outfile)

    return response

def crawl_cryptocoinnews(section, no_of_last_pages, after_each):
    print 'Crawling cryptocoinnews.com/' + section
    headers = { 'Accept-Encoding': 'identity' }

    articles = []
    no_of_news = 0

    for index in range(1, no_of_last_pages):
        r = requests.get("https://www.cryptocoinsnews.com/" + section + "/page/" + str(index), headers=headers)

        pq = PyQuery(r.text)
        post_wrapper_tag = 'type-post'
        postTags = pq('div.' + post_wrapper_tag)

        print 'Crawled page ' + str(index) + ': Extracted ' + str(len(postTags))

        for postTag in postTags:
            postTagObj = PyQuery(postTag)

            splitted_date = postTagObj('span.date').text().split('/')

            time =  str(splitted_date[2]) + '-' + str(splitted_date[1]) + '-' + str(splitted_date[0]) + 'T00:00:00+00:00'
            url =  postTagObj('div > h3 > a').attr('href')
            title = postTagObj('div > h3 > a').text()
            article = { "url": url, "title": title.encode("utf-8"), "time": time }
            no_of_news = no_of_news + 1

            after_each(article)

        print 'cryptocoinnews.com: ' + str(no_of_news) + ' articles has been extracted.'

        

    return articles

def crawl_bitcoin(no_of_last_pages=325):
    print 'Crawling bitcoin'
    headers = { 'Accept-Encoding': 'identity' }

    articles = []

    for index in range(1, no_of_last_pages):
        r = requests.get("https://news.bitcoin.com/page/" + str(index), headers=headers)

        pq = PyQuery(r.text)
        postTags = pq('div.td_module_wrap')

        print 'Crawled page ' + str(index) + ': Extracted ' + str(len(postTags))

        for postTag in postTags:
            postTagObj = PyQuery(postTag)
            time =  postTagObj('time').attr('datetime')
            url =  postTagObj('div > h3 > a').attr('href')
            title = postTagObj('div > h3 > a').text()
            article = { "url": url, "title": title.encode("utf-8"), "time": time }
            articles.append(article)
        
        print 'news.bitcoin.com: ' + str(len(articles)) + ' articles has been extracted.'

    return articles

def crawl_coindesk():
    headers = {'Accept-Encoding': 'identity'}
    r = requests.get('http://www.coindesk.com/category/news/', headers=headers)

    articles = []

    pq = PyQuery(r.text)
    post_tags = pq('div.post')

    for postTag in post_tags:
        postTagObj = PyQuery(postTag)
        time = postTagObj('time').attr('datetime')
        url = postTagObj('div > a').attr('href')
        title = postTagObj('div > a').attr('title')
        article = {'url': url, 'title': title, 'time': time}
        articles.append(article)

    return articles