import crawl
import models

def commit_news(news):
    try:
        models.add_news(url=news['url'], title=unicode(news['title']), time=news['time'])
    except:
        pass

#crawl.crawl_bitcoin(no_of_last_pages=3, after_each=commit_news)

crawl.crawl_cryptocoinnews(section='accepts-bitcoin', no_of_last_pages=3, after_each=commit_news)