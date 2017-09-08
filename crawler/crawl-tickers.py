
import requests
import json

url = 'https://api.coinmarketcap.com/v1/ticker/'

def crawl_tickers():
    print 'Crawling bitcoin prices'

    r = requests.get(url)

    jsonObject = r.json()

    return jsonObject
