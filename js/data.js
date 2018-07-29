var mnths = ["Jan Day", "Feb Day", "Mar Day", "Apr Day", "May Day", "Jun Day", "Jul Day", "Aug Day", "Sep Day", "Oct Day", "Nov Day", "Dec Day", "Jan Night", "Feb Night", "Mar Night", "Apr Night", "May Night", "Jun Night", "Jul Night", "Aug Night", "Sep Night", "Oct Night", "Nov Night", "Dec Night"]
var normalMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var areaAvgs = []
var areaParseDate = d3.timeParse("%m")
var areaFormatDate = d3.timeFormat("%b")
var areaPsTime = d3.timeParse("%b")
var key = ["Moderate", "Strong", "Major", "Great"];
var year = 1965;
normalMonths.forEach(d => {
    areaAvgs.push({
        month: d,
        avgL: [],
        avg: 0
    })
});
var avgs = []
mnths.forEach(d => {
    avgs.push({
        magnis: [],
        types: {
            "Great": 0,
            "Strong": 0,
            "Moderate": 0,
            "Major": 0
        },
        total: 0,
        maxM: 0,
        avgM: 0,
        name: d
    })
});
var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
var barparseDate = d3.timeParse("%m/%d/%Y"),
    barFormatDate = d3.timeFormat("%b")
var minYArea = 1965;
var maxYArea = 2016;
var minYBar = 1965;
var maxYBar = 2016;
var stMin = 1965;
var stMax = 2016;

$("#date-slider-stack").slider({
    range: true,
    max: 2016,
    min: 1965,
    step: 1, // One day
    values: [1965, 2016],
    slide: function (event, ui) {
        $("#dateLabel5").text(ui.values[0]);
        $("#dateLabel6").text(ui.values[1]);
        stMin = ui.values[0];
        stMax = ui.values[1];
        stBarUpdate()
    }
});
$("#date-slider-area").slider({
    range: true,
    max: 2016,
    min: 1965,
    step: 1, // One day
    values: [1965, 2016],
    slide: function (event, ui) {
        $("#dateLabel1").text(ui.values[0]);
        $("#dateLabel2").text(ui.values[1]);
        minYArea = ui.values[0];
        maxYArea = ui.values[1];
        tempChange()
    }
});
$("#date-slider-bar").slider({
    range: true,
    max: 2016,
    min: 1965,
    step: 1, // One day
    values: [1965, 2016],
    slide: function (event, ui) {
        $("#dateLabel3").text(ui.values[0]);
        $("#dateLabel4").text(ui.values[1]);
        minYBar = ui.values[0];
        maxYBar = ui.values[1];
        earthChange()
    }
});
var time = 1965;
$("#world-slider").slider({
    max: 2016,
    min: 1965,
    step: 1, // One day
    slide: function (event, ui) {
        $("#worldLabel1").text(ui.value);
        time = parseInt(ui.value)
        worldChange(time)
    }
});
var interval;
$("#world-play").on("click", function () {
    var button = $(this);
    if (button.text() == "Play") {
        button.text("Pause");
        interval = setInterval(worldStep, 1000)
    } else {
        clearInterval(interval);
        button.text("Play");
    }
});
$("#world-reset").on("click", function () {
    time = 1965;
    $("#world-slider").slider("value", +(time))
    $("#worldLabel1").text(time);
    worldChange(time)
});

function worldStep() {
    time = (time < 2016) ? time + 1 : 1965;
    $("#world-slider").slider("value", +(time))
    $("#worldLabel1").text(time);
    worldChange(time)
}
var indonesia = new Annotation(250, 100, 100, 150, "Earth", "#world-svg")
// indonesia.hide()
function worldChange(year) {
    var worldMapData = []
    earth.forEach(d => {
        if (parseInt(d["Year"]) == year) {
            worldMapData.push(d)
        }
    })
    if(year == 2004){
        indonesia.show()
    }else{
        indonesia.hide()
    }
    world.update(worldMapData)
}
var TempData;
var run = 0;

function tempChange() {
    TempData.forEach(d => {
        if (parseInt(d["Year "]) >= minYArea && parseInt(d["Year "]) <= maxYArea) {
            var tempMonth = areaFormatDate(areaParseDate(d["Month"]))
            // console.log(tempMonth)
            // console.log(normalMonths.indexOf(tempMonth))
            var aa = areaAvgs[normalMonths.indexOf(tempMonth)]["avgL"]
            aa.push(d["Median"])
            var totales = 0;
            for (var i = 0; i < aa.length; i++) {
                totales += +aa[i];
            }
            var avgerageMg = totales / aa.length;
            areaAvgs[normalMonths.indexOf(tempMonth)]["avg"] = avgerageMg;
        }
    });
    if (run == 0) {
        areaAvgs.forEach(d => {
            d.month = areaPsTime(d.month)
            return d;
        })
    }
    updateArea(areaAvgs)
    run += 1
}
d3.tsv("data/Temperature.tsv", function (error, empData) {
    if (error) {
        throw error;
    };
    TempData = empData;
    tempChange()
})
var earth;

function earthChange() {
    var avgs = [];
    var newData = []
    mnths.forEach(d => {
        avgs.push({
            magnis: [],
            types: {
                "Great": 0,
                "Strong": 0,
                "Moderate": 0,
                "Major": 0
            },
            total: 0,
            maxM: 0,
            avgM: 0,
            name: d
        })
    });
    earth.forEach(d => {
        if (parseInt(d["Year"]) >= minYBar && parseInt(d["Year"]) <= maxYBar) {
            newData.push(d)
            var mnth = barFormatDate(barparseDate(d["Date"]))
            var tmDy = d["Day-Night"]
            var fullname = mnth + " " + tmDy
            var avgsD = avgs[mnths.indexOf(fullname)]
            avgsD.magnis.push(parseInt(d["Magnitude"]))
            var totales = 0;
            for (var i = 0; i < avgsD.magnis.length; i++) {
                totales += avgsD.magnis[i];
            }
            var avgerageMg = totales / avgsD.magnis.length;
            avgsD.avgM = Math.max(Math.round(avgerageMg * 10) / 10, 2.8).toFixed(2);
            if (d["Magnitude"] > avgsD.maxM) {
                avgsD.maxM = d["Magnitude"]
            }
            avgsD.types[d["Type"]]++;
            avgsD.total = avgsD.magnis.length;
        }

    });
    barUpdate(avgs);
    // stBarUpdate(avgs);
}
var stBarChart;

function stBarUpdate() {
    var stBarData = []
    mnths.forEach(d => {
        stBarData.push({
            date: d,
            Great: 0,
            Major: 0,
            Strong: 0,
            Moderate: 0,
            total: 0
        })
    })
    earth.forEach(d => {
        if (parseInt(d["Year"]) >= stMin && parseInt(d["Year"]) <= stMax) {
            var mnth = barFormatDate(barparseDate(d["Date"]))
            var tmDy = d["Day-Night"]
            var fullname = mnth + " " + tmDy
            var stdD = stBarData[mnths.indexOf(fullname)]
            stdD[d["Type"]]++;
            stdD["total"]++;
        }
    })
    stBarChart.render(stBarData)
    
}
var world;
d3.csv("data/Earthquakes.csv", function (error, data) {
    earth = data;
    var wMdata = []
    var stBarData = []
    mnths.forEach(d => {
        stBarData.push({
            date: d,
            Great: 0,
            Major: 0,
            Strong: 0,
            Moderate: 0,
            total: 0
        })
    })
    earth.forEach(d => {
        if (parseInt(d["Year"]) == year) {
            wMdata.push(d)
        }
        if (parseInt(d["Year"]) >= stMin && parseInt(d["Year"]) <= stMax) {
            var mnth = barFormatDate(barparseDate(d["Date"]))
            var tmDy = d["Day-Night"]
            var fullname = mnth + " " + tmDy
            var stdD = stBarData[mnths.indexOf(fullname)]
            stdD[d["Type"]]++;
            stdD["total"]++;
        }
    })
    world = new WorldMap(400, "#world", wMdata);
    earthChange()
    stBarChart = new stBar({
        element:'stacked-bar',
        key:key,
        data:stBarData
    })
})