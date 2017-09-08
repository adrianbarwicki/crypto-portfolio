const cheerio = require('cheerio');
const request = require('request');

/**
<div id="post-285207" class="article medium post-285207 post type-post status-publish format-standard has-post-thumbnail hentry category-regulation-legal category-news category-legal tag-canada tag-bcsc">
    <div class="picture">
        <a class="fade" href="https://www.coindesk.com/bitcoin-fund-manager-wins-approval-canadian-regulators/" title="Bitcoin Fund Manager Wins Approval from Canadian Regulators">
            <img width="200" height="135" src="https://media.coindesk.com/uploads/2017/09/Flag-200x135.jpg" class=" wp-post-image" alt="" srcset="https://media.coindesk.com/uploads/2017/09/Flag-200x135.jpg 200w, https://media.coindesk.com/uploads/2017/09/Flag-90x60.jpg 90w, https://media.coindesk.com/uploads/2017/09/Flag-119x79.jpg 119w" sizes="(max-width: 200px) 100vw, 200px">				</a>
    </div>

    <div class="post-info">
        <h3>
            <a class="fade" href="https://www.coindesk.com/bitcoin-fund-manager-wins-approval-canadian-regulators/" title="Bitcoin Fund Manager Wins Approval from Canadian Regulators">Bitcoin Fund Manager Wins Approval from Canadian Regulators</a>
        </h3>
        <p class="timeauthor"><time datetime="2017-09-08T19:55:33+00:00">Sep 8, 2017 at 19:55</time> | <cite><a href="https://www.coindesk.com/author/rachelroseoleary/" title="Posts by Rachel Rose O'Leary" rel="author">Rachel Rose O'Leary</a></cite></p>
        <p class="desc">A new bitcoin investment fund manager has received the approval of securities regulators in Canada. </p>			</div>
    </div>
</div>
 */
const meta = {
    url: 'https://www.coindesk.com/category/news/',
    properties: {
        base: 'div.post',
        title: 'h3 > a',
        url: 'h3 > a',
        time: 'time'
    }
};

const scrape = cb => {
    const posts = [];

    console.log(`Crawling ${meta.url}`);

    request
    .get(meta.url, (err, response, body) => {
        const $ = cheerio.load(body);
     
        $(meta.properties.base).each(function() {
            const postDO = {};

            $(meta.properties.title, this).each(function(index, element) {
                postDO.title = element.attribs.title;
            });

            $(meta.properties.url, this).each(function(index, element) {
                postDO.url = element.attribs.href;
            });
        
            $(meta.properties.time, this).each(function(index, element) {
                postDO.time =element.attribs.datetime;
            });

            posts.push(postDO);
          });

          console.log(`Extracted ${posts.length} articles`);

          return cb ? cb(null, posts) : console.log(posts);
        });
};

module.exports = {
    scrape
};

