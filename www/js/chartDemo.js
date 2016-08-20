function makeCharts() {
    google.charts.load('current', {
        packages: ['corechart', 'gauge']
    });
    window.onresize = resizeCharts;
    google.charts.setOnLoadCallback(drawBarChart);
    google.charts.setOnLoadCallback(drawGauge);
    //makeDemoChart(demoChart);
}

function resizeCharts() {
    drawBarChart();
    drawGauge();
}

function drawBarChart() {
    var canvas = $('#DemoChart')[0];
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Room');
    data.addColumn('number', 'Num People');
    data.addRows([
        ['Living Room', 3]
        , ['Kitchen', 1]
        , ['Bedroom', 1]
        , ['Bathroom', 1]
        , ['Dining Room', 2]
      ]);
    var options = {
        'legend': 'left'
        , 'title': 'Room Occupation'
        , 'is3D': true
    }
    var chart = new google.visualization.BarChart(canvas);
    chart.draw(data, options);
    setInterval(function () {
        data.setValue(0, 1, Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 13000);
    setInterval(function () {
        data.setValue(1, 1, Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 5000);
    setInterval(function () {
        data.setValue(2, 1, Math.round(20 * Math.random()));
        chart.draw(data, options);
    }, 26000);
    setInterval(function () {
        data.setValue(3, 1, Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 13000);
    setInterval(function () {
        data.setValue(4, 1, Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 5000);
}

function drawGauge() {
    var canvas = $('.gauge1')[0];
    var data = google.visualization.arrayToDataTable([
          ['Label', 'Value']
          , ['Water Level', 80]
          , ['Temperature', 55]
          , ['O2 Levels', 68]
        ]);
    var options = {
        redFrom: 90
        , redTo: 100
        , yellowFrom: 75
        , yellowTo: 90
        , minorTicks: 5
    };
    var chart = new google.visualization.Gauge(canvas);
    chart.draw(data, options);
    setInterval(function () {
        data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 13000);
    setInterval(function () {
        data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 5000);
    setInterval(function () {
        data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
        chart.draw(data, options);
    }, 26000);
}