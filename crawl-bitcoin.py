import requests
from pyquery import PyQuery  

headers = { 'Accept-Encoding': 'identity' }

articles = []

for index in range(1, 303):
    r = requests.get("https://news.bitcoin.com/page/" + str(index), headers=headers)

    pq = PyQuery(r.text)
    postTags = pq('div.td_module_wrap')

    for postTag in postTags:
        postTagObj = PyQuery(postTag)
        time =  postTagObj('time').attr('datetime')
        url =  postTagObj('div > h3 > a').attr('href')
        title = postTagObj('div > h3 > a').text()
        article = { "url": url, "title": title.encode("utf-8"), "time": time }
        articles.append(article)

print articles
