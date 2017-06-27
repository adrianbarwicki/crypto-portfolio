import crawl
import models

recent_news = crawl.crawl_bitcoin(no_of_last_pages=100)

print 'Extracted total of ' + str(len(recent_news)) + ' news'

for news in recent_news:
    try:
        models.add_news(url=news['url'], title=unicode(news['title']), time=news['time'])
    except:
        pass

