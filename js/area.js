var areasvg = d3.select("#area"),
    areamargin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    areawidth = +areasvg.attr("width") - areamargin.left - areamargin.right,
    areaheight = +areasvg.attr("height") - areamargin.top - areamargin.bottom
var areax = d3.scaleTime().range([0, areawidth])
areay = d3.scaleLinear().range([areaheight, 0])

var areaxAxisCall = d3.axisBottom(areax),
    areayAxisCall = d3.axisLeft(areay);
var area = d3.area()
    .x(function (d) {
        return areax(d["month"])
    })
    .y0(areaheight)
    .y1(function (d) {
        return areay(d.avg)
    })
areasvg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("areawidth", areawidth)
    .attr("areaheight", areaheight);

var areafocus = areasvg.append("g")
    .attr("class", "focus")
    .attr("id", "fcs")
    .attr("fill", "black")
    .attr("transform", "translate(" + areamargin.left + "," + areamargin.top + ")");
var areaXAxis = areafocus.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + areaheight + ")")
    .call(areaxAxisCall.ticks(12).tickFormat(d3.timeFormat("%b")));

var areaYAxis = areafocus.append("g")
    .attr("class", "axis axis--y")
    .call(areayAxisCall);

function updateArea(dta) {
    console.log("Hello")
    areax.domain(d3.extent(dta, function (d) {
        console.log(d)
        return d["month"];
    }));
    areay.domain([d3.min(dta, function (d) {
        return d.avg;
    }), d3.max(dta, function (d) {
        return d.avg;
    })]);
    areaxAxisCall.scale(areax);
    areaXAxis.transition().duration(1000).call(areaxAxisCall);
    areayAxisCall.scale(areay);
    areaYAxis.transition().duration(1000).call(areayAxisCall);
    areafocus.append("path")
        .transition().duration(1000)
        .attr("class", "area")
        .attr("fill", "steelblue")
        .attr("d", area(dta));

}