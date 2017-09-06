import os
from pony.orm import *
import pymysql

db = Database()

class Price(db.Entity):
    id = PrimaryKey(int, auto=True)
    code = Required(str)
    date = Required(str)
    weighted_price = Required(float)
    open = Optional(float)
    high = Optional(float)
    low = Optional(float)
    close = Optional(float)
    volume_local = Optional(float)
    volume_currency = Optional(float)
    composite_key(code, date)

class AssetPosition(db.Entity):
    id = PrimaryKey(int, auto=True)
    ticker = Required(str, unique=True)
    price = Required(float)
    amount = Required(float)
    total_value = Required(float)

class News(db.Entity):
    id = PrimaryKey(int, auto=True)
    url = Required(str, unique=True)
    time = Required(str)
    title = Required(str)

db.bind('mysql', host=os.environ.get('VQ_DB_HOST'), user=os.environ.get('VQ_DB_USER'), passwd=os.environ.get('VQ_DB_PW'), db='bitcoin')

db.generate_mapping(create_tables=True)

@db_session
def add_news(url, title, time):
    news = News(url=url, title=title, time=time)
   
@db_session
def add_price_point(date, code, open, high, low, close, volume_local, volume_currency, weighted_price):
    news = Price(date=date, code=code, open=open, high=high, low=low, close=close, volume_local=volume_local, volume_currency=volume_currency, weighted_price=weighted_price)

@db_session
def edit_asset_position(ticker, price, amount):
    position = AssetPosition.get(ticker=ticker)

    if position == None:
        AssetPosition(ticker=ticker, price=price, amount=amount, total_value=amount*price)
    else:
        position.price=price
        position.amount*price
        position.amount=amount
 