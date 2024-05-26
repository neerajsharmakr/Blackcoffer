// src/PieChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


const PieChart = ({ data, country }) => {
    const svgRef = useRef();
    useEffect(() => {

        const svg = d3.select(svgRef.current);
        const { width, height } = svg.node().getBoundingClientRect();
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie()
            .value(d => d.intensity)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Clear previous contents
        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${width / 3},${height / 2})`);

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('padding', '6px')
            .style('background', 'lightsteelblue')
            .style('border-radius', '4px')
            .style('pointer-events', 'none')
            .style('display', 'none');

        g.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.topic))
            .on('mousemove', (event, d) => {
                tooltip
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY + 10}px`)
                    .style('display', 'inline-block')
                    .html(`Topic: ${d.data.topic}<br>Intensity: ${d.data.intensity}`);

            })

            .on('mouseout', () => {
                tooltip.style('display', 'none');
            });

        const legend = svg.append('g')
            .attr('transform', `translate(${(width / 2) + 50}, 0)`);

        legend.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', (d, i) => i * 25) // Increased spacing
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', d => color(d.topic));

        legend.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x', 24)
            .attr('y', (d, i) => i * 25 + 9) // Increased spacing
            .attr('dy', '0.35em')
            .text(d => d.topic);

    });


    return (
        <div style={{ textAlign: 'left' }}>
            <h4>{country}</h4>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default PieChart;
