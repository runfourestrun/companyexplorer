import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyNode } from 'd3-sankey';

interface SankeyDiagramProps {
    data: any;
    width: number;
    height: number;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ data, width, height }) => {
    const svgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const generateSankeyDiagram = () => {
            // Prepare your data for the Sankey diagram

            // Initialize the D3 Sankey layout
            const sankeyLayout = sankey()
                .nodeWidth(15)
                .nodePadding(10)
                .extent([[1, 1], [width - 1, height - 6]]); // Set your desired width and height

            // Set up the Sankey diagram links
            const { links, nodes } = sankeyLayout(data);

            // Create an SVG element for the diagram
            const svg = d3.select(svgRef.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            // Render the Sankey diagram links
            svg.append("g")
                .selectAll("path")
                .data(links)
                .join("path")
                .attr("d", sankeyLinkHorizontal())
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0.2)
                .attr("fill", "none")
                .style("mix-blend-mode", "multiply");

            // Render the Sankey diagram nodes
            svg.append("g")
                .selectAll<SVGRectElement, SankeyNode<any, any>>("rect")
                .data(nodes)
                .join("rect")
                .attr("x", (d: SankeyNode<any, any>) => String(d.x0))
                .attr("y", (d: SankeyNode<any, any>) => String(d.y0))
                .attr("height", (d: SankeyNode<any, any>) => String(d.y1 - d.y0))
                .attr("width", (d: SankeyNode<any, any>) => String(d.x1 - d.x0))
                .attr("fill", "#69b3a2");
        };

        if (data) {
            generateSankeyDiagram();
        }
    }, [data, width, height]);

    return <div ref={svgRef}></div>;
};

export default SankeyDiagram;
