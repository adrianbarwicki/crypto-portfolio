import crawl
import crawl_prices
import crawl
import models

def init():
    recent_asset_positions = crawl.crawl_asset_positions()

    for asset_position in recent_asset_positions['positions']:
        print asset_position
        models.edit_asset_position(
            ticker=asset_position['ticker'],
            price=asset_position['price'],
            amount=asset_position['amount']
        )

    print recent_asset_positions

    recent_news = crawl.crawl_bitcoin(no_of_last_pages=3)

    for news in recent_news:
        try:
            models.add_news(url=news['url'], title=unicode(news['title']), time=news['time'])
        except:
            pass
    '''
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

if __name__ == '__main__':
    init()
