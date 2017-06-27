import requests
import json

url = 'https://www.quandl.com/api/v3/datasets/BCHARTS/COINBASEEUR.json?api_key=yG1CTFPVpgX4-dW3CAe2'

def crawl_bitcoin():
    print 'Crawling bitcoin prices'

    r = requests.get(url)

    jsonObject = r.json()

    return jsonObject
