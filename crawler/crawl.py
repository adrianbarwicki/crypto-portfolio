import requests
from pyquery import PyQuery  

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