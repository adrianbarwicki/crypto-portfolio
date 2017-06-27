import crawl
import crawl_prices
import models


prices = crawl_prices.crawl_bitcoin()

for row in prices['dataset']['data']:
    models.add_price_point(
    code='BTC',
    date=row[0],
    open=row[1],
    high=row[2],
    low=row[3],
    close=row[4],
    volume_local=row[5],
    volume_currency=row[6],
    weighted_price=row[7]
    )

'''
recent_news = crawl.crawl_bitcoin(no_of_last_pages=2)
for news in recent_news:
    try:
        models.add_news(url=news['url'], title=unicode(news['title']), time=news['time'])
    except:
        pass
'''