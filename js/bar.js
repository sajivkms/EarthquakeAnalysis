var svg3 = d3.select("#sbar"),
    margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 60
    },
    width = +svg3.attr("width") - margin.left - margin.right,
    height = +svg3.attr("height") - margin.top - margin.bottom;
var bar1tooltip = d3.select("body").append("div").attr("class", "toolTip");
// console.log(earthq_dt_to_use)
var barrx = d3.scaleLinear().range([0, width]);
var barry = d3.scaleBand().range([height, 0]);
var barg = svg3.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var barXcall = d3.axisBottom(barrx);
var barYCall = d3.axisLeft(barry);
var barXAxis = barg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(barXcall);
// .tickSizeInner([-height]));

var barYAxis = barg.append("g")
    .attr("class", "y axis")
    .call(barYCall);

function barUpdate(avgs) {
    barrx.domain([0, d3.max(avgs, function (d) {
        return d.avgM;
    })]);
    barry.domain(avgs.map(function (d) {
        return d.name;
    })).padding(0.1);
    barXcall.scale(barrx);
    barXAxis.transition().duration(1000).call(barXcall);
    barYCall.scale(barry);
    barYAxis.transition().duration(1000).call(barYCall);
    var barSelect = barg.selectAll("rect")
        .data(avgs)
    // Exit
    barSelect.exit()
        .attr("fill", "steelblue")
        .transition().duration(7000)
        .attr("x", 0)
        .attr("width", 0)
    //Update
    barSelect
        .transition().duration(1000)
        .attr("width", function (d) {
            return barrx(d["avgM"]);
        });
    //Enter
    barSelect
        .enter().append("rect")
        .attr("fill", "steelblue")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", barry.bandwidth())
        .attr("y", function (d) {
            return barry(d["name"]);
        })
        .attr("width", function (d) {
            return barrx(d["avgM"]);
        })
        .on("mousemove", function (d) {
            bar1tooltip
                .style("left", d3.event.pageX - 80 + "px")
                .style("top", d3.event.pageY - 120 + "px")
                .style("display", "inline-block")
                .html("Date: " + (d.name) + "<br>" + "Average Magnitude: " + (d.avgM) + "<br>" + "Max Magnitude: " + (d.maxM));
        })
        .on("mouseout", function (d) {
            bar1tooltip.style("display", "none");
        });
}