(function() {
    google.charts.load('current', {packages: ['corechart', 'line', 'annotatedtimeline']});
google.charts.setOnLoadCallback(drawBasic);

function getNormalDate(dateObj) {
    var month = dateObj.getMonth() + 1;
    var date = dateObj.getDate();

    if (month < 10) month = '0' + month;
    if (date < 10) date = '0' + date;

    return [ String(dateObj.getFullYear()), String(month), String(date)].join('-');
}

function drawBasic() {
     var pricePoints = {};
     var news = [];

     fetch('/api/price/bitcoin')
     .then(response => {
            return response.json();
     })
     .then(data => {
         data.forEach(pricePoint => {
            pricePoints[pricePoint.date] = pricePoint.weighted_price;
         });
         
         fetch('/api/news/bitcoin')
         .then(response => {
            return response.json();
         })
         .then(bitcoinNews => {
            news = bitcoinNews;

            var dates = Object.keys(pricePoints).map(date => [ new Date(date), pricePoints[date] ])

            news = news.map(item => {
                var priceDate = getNormalDate(new Date(item.time));
                var price = pricePoints[priceDate];

                return [ new Date(item.time), price, item.title ]
            });

            var data = new google.visualization.DataTable();
            data.addColumn('date', 'X');
            data.addColumn('number', 'Bitcoin Price');

            data.addRows(dates);

            var options = {
              hAxis: {
                title: 'Date'
              },
              vAxis: {
                title: 'USD'
              }
            };

            var data2 = new google.visualization.DataTable();
              data2.addColumn('date', 'Date');
              data2.addColumn('number', 'News');
              data2.addColumn('string', 'News');
              data2.addRows(news);

            var achart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div_2'));
            achart.draw(data2, {displayAnnotations: true, allowRedraw:true, displayAnnotationsFilter: true});

            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(data, options);
          });
       });
    }
})();
