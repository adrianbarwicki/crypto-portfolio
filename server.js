const request = require('request');
const cheerio = require('cheerio');
const read = require('read-file');

const html = read.sync('demo.html', { encoding: 'utf8' })
console.log(html);
/*
request('https://www.coindesk.com/category/news/', (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage.

  var $ = cheerio.load(body);

  console.log($('div.post'))
});
*/

