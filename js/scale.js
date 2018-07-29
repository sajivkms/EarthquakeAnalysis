var scaleSvg = d3.select("#scale")
    .attr("width", "100px")
    .attr("height", "70px")
var scaleKey = ["Moderate", "Strong", "Major", "Great"];
var scaleColor = d3.scaleOrdinal(d3.schemeCategory20)
var legend = scaleSvg.append("g").attr("transform","translate(90, 0)")
scaleKey.forEach((d, i) => {
    var legendRow = legend.append("g")
        .attr("transform","translate(0, "+(i * 20) + ")")
    legendRow.append("rect")
        .attr("height",10)
        .attr("width",10)
        .attr("fill",scaleColor(i));
    legendRow.append("text")
        .attr("x",-10)
        .attr("y",10)
        .attr("text-anchor","end")
        .style("text-transform","capitalize")
        .text(d);
})