import requests


from pyquery import PyQuery  

headers = {'Accept-Encoding': 'identity'}
r = requests.get('http://www.coindesk.com/category/news/', headers=headers)

html =  open("demo.html").read().decode('utf8')

articles = []

pq = PyQuery(r.text)
postTags = pq('div.post')

for postTag in postTags:
    postTagObj = PyQuery(postTag)
    time =  postTagObj('time').attr('datetime')
    url =  postTagObj('div > a').attr('href')
    title = postTagObj('div > a').attr('title')
    article = { 'url': url, 'title': title, 'time': time }
    articles.append(article)

print articles
