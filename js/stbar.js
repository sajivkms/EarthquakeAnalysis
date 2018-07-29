class stBar {
    constructor(config) {
        this.domEle = config.element
        this.stackKey = config.key
        this.data = config.data
        this.margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 80
        }
        this.width = 670 - this.margin.left - this.margin.right
        this.height = 300 - this.margin.top - this.margin.bottom
        this.initVis()
    }

    initVis() {
        var vis = this;
        vis.xScale = d3.scaleLinear().rangeRound([0, width])
        vis.yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1)
        vis.stBarxAxis = d3.axisBottom(vis.xScale)
        vis.stBaryAxis = d3.axisLeft(vis.yScale)
        vis.svg = d3.select("#" + vis.domEle).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");
        vis.xAxis = vis.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (vis.height + 5) + ")")
            .call(vis.stBarxAxis);

        vis.yAxis = vis.svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .call(vis.stBaryAxis);
        vis.render(vis.data)
        vis.render(vis.data)
    }
    render(dt) {
        var vis = this;
        dt.sort(function(a, b) { return b.total - a.total; });
        var stactooltip = d3.select("body").append("div").attr("class", "toolTip");
        var stack = d3.stack()
            .keys(vis.stackKey)
            .offset(d3.stackOffsetNone);
        var color = d3.scaleOrdinal(d3.schemeCategory20)
        var layers = stack(dt);
        vis.yScale.domain(dt.map(function (d) {
            return d.date;
        }));
        vis.xScale.domain([0, d3.max(layers[layers.length - 1], function (d) {
            return d.data.total;
        })]).nice();
        vis.stBarxAxis.scale(vis.xScale);
        vis.xAxis.transition().duration(1000).call(vis.stBarxAxis);
        vis.stBarxAxis.scale(vis.yScale);
        vis.yAxis.transition().duration(1000).call(vis.stBaryAxis);
        // var layer = vis.svg.selectAll(".layer")
        //     .data(stack(dt))
        //     .enter().append("g")
        //     .attr("class", "layer")
        //     .style("fill", function (d, i) {
        //         console.log(d)
        //         return color(i);
        //     });
        var layer = vis.svg.selectAll(".layer")
            .data(stack(dt))
        layer.exit().remove()
        layer
            .enter().append("g")
            .attr("class", "layer")
            .style("fill", function (d, i) {
                return color(i);
            });

        var lyRects = layer.selectAll("rect")
            .data(function (d) {
                return d
            })
        lyRects.exit()
            .transition().duration(1000)
            .attr("x", function (d) {
                return vis.xScale(d[0]);
            })
            .attr("width", function (d) {
                return vis.xScale(d[1]) - vis.xScale(d[0]);
            })
        lyRects
            .transition().duration(1000)
            .attr("x", function (d) {
                return vis.xScale(d[0]);
            })
            .attr("width", function (d) {
                return vis.xScale(d[1]) - vis.xScale(d[0]);
            })
        lyRects
            .enter().append("rect")
            .attr("y", function (d) {
                return vis.yScale(d.data.date);
            })
            .attr("x", function (d) {
                return vis.xScale(d[0]);
            })
            .attr("height", vis.yScale.bandwidth())
            .attr("width", function (d) {
                return vis.xScale(d[1]) - vis.xScale(d[0]);
            })
            .on("mousemove", function (d) {
                var amount = d[1] - d[0]
                for (const sc in vis.stackKey) {
                    if (d.data[vis.stackKey[sc]] == amount) {
                        var scale = vis.stackKey[sc];
                    }
                }
                stactooltip
                    .style("left", d3.event.pageX - 80 + "px")
                    .style("top", d3.event.pageY - 150 + "px")
                    .style("display", "inline-block")
                    .html("Date: " + (d.data.date) + "<br>" + "Number of earthquakes: " + (amount) + "<br>" + "Scale: " + (scale) + "<br>" + "Total: " + (d.data.total));
            })
            .on("mouseout", function (d) {
                stactooltip.style("display", "none");
            });
    }
}