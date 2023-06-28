import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { HierarchyNode, HierarchyRectangularNode} from 'd3-hierarchy';
import { DefaultArcObject} from 'd3-shape';

interface SubBrand {
    brandName: string;
    // Define other properties of SubBrand if applicable
}


interface Node {
    name: string;
    children?: Node[];
}

interface SunburstProps {
    brandName: string;
    subBrands: SubBrand[];
}

const SunburstChart = ({ brandName, subBrands }: SunburstProps) => {
    const chartRef = useRef<SVGSVGElement | null>(null);


    const createNodeData = (brandName: string, subBrands: SubBrand[]) => {
        const children = subBrands.map((subBrand) => ({
            name: subBrand.brandName,
        }));

        const nodeData: Node = {
            name: "Subsidiaries",
            children: [
                {
                    name: brandName,
                    children: children,
                },
            ],
        };

        return nodeData;
    };

    const nodeData = createNodeData(brandName, subBrands);


    const width = 500;  // <-- 1
    const height = 500;
    const radius = Math.min(width, height) / 2;  // < -- 2
    const color = d3.scaleOrdinal(d3.schemeCategory10);


    const g = d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


    const partition = d3.partition<Node>()  // <-- 1
        .size([2 * Math.PI, radius]);

    const root: HierarchyNode<Node> = d3.hierarchy<Node>(nodeData)


    partition(root);  // <-- 1


    const arc = d3.arc()
        .startAngle(() => 0) // Hardcoded start angle
        .endAngle(() => Math.PI / 2) // Hardcoded end angle
        .innerRadius(() => 0) // Hardcoded inner radius
        .outerRadius(() => radius); // Hardcoded outer radius

    g.selectAll('path')  // <-- 1
        .data(root.descendants())  // <-- 2
        .enter()  // <-- 3
        .append('path')  // <-- 4
        .attr("display", function (d) {
            return d.depth ? null : "none";
        })  // <-- 5
        .attr("d", arc as any)  // <-- 6
        .style('stroke', '#fff')  // <-- 7
        .style("fill", function (d) { // @ts-ignore
            return color((d.children ? d : d.parent).data.name); });  // <-- 8



    return (
        <div>
            <h1>Sunburst Chart Example</h1>
            {/* Render the chart directly */}
            <svg ref={chartRef}></svg>
        </div>
    );


};





export default SunburstChart;


