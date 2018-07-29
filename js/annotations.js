class Annotation {
    constructor(lx, ly, lx2, ly2, text, parent) {
        this.lx = lx;
        this.ly = ly;
        this.lx2 = lx2;
        this.ly2 = ly2;
        this.txt = text;
        this.parent = parent;
        this.createLineAndText();
    }
    createLineAndText() {
        var vis = this;
        vis.svg = d3.select(this.parent);
        vis.line = vis.svg.append("line")
        vis.line.attr("x1", vis.lx)
            .attr("x2", vis.lx2)
            .attr("y1", vis.ly)
            .attr("y2", vis.ly2)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
        vis.text = vis.svg.append("text")
        vis.text.attr("x", this.lx2)
        vis.text.attr("y", this.ly2)
        vis.text.text(vis.txt)
    }
    hide(){
        var vis = this;
        vis.text.style("display","none")
        vis.line.style("display","none")

    }
    show(){
        var vis = this;
        vis.line.style("display","block")
        vis.text.style("display","block")
    }
}