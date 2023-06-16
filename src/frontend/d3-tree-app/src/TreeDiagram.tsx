import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TreeDiagramProps {
    data: { brandName: string }[];
}

const TreeDiagram: React.FC<TreeDiagramProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (data.length > 0 && svgRef.current) {
            // Clear previous content
            d3.select(svgRef.current).html('');

            // Create tree layout
            const treeLayout = d3.tree<{ brandName: string }>().size([600, 400]);
            const root = d3.hierarchy<{ brandName: string }>(data[0]);
            const treeData = treeLayout(root);

            // Append SVG elements
            const svg = d3.select(svgRef.current);
            const nodes = svg.selectAll('.node').data(treeData.descendants());
            const links = svg.selectAll('.link').data(treeData.links());

            // Enter nodes
            nodes
                .enter()
                .append('circle')
                .attr('class', 'node')
                .attr('r', 10)
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y);

            // Enter links
            links
                .enter()
                .append('line')
                .attr('class', 'link')
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);
        }
    }, [data]);

    return (
        <svg ref={svgRef} width={800} height={600}>
            <g transform="translate(50, 50)" />
        </svg>
    );
};

export default TreeDiagram;