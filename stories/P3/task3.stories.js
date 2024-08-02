import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

// data from https://www.kaggle.com/datasets/berkeleyearth/climate-change-earth-surface-temperature-data
import air from "../../public/chartaccent_airquality.json";
import { Range, Draft } from "auteur";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Aug/P3/Task3',
};

export const Task3 = () => {

	const ref = useRef("Task3");

	const [data, setData] = React.useState(air);

	let layout={"width":1200,
	   		   "height":700,
	   		   "marginTop":50,
	   		   "marginRight":100,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	useEffect(() => {

		let svgElement = d3.select(ref.current);

		svgElement.attr("width", layout.width)
				.attr("height", layout.height);

		let xScale = d3.scalePoint()
					.domain(data.map(d => d["Day"]))
					.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleLinear()
					.domain([0, 450])
					.range([layout.height - layout.marginBottom, layout.marginTop]);

		svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
				  .data(["Day"])
				  .join("text")
				  .attr("id", "xTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(${layout.width/2}, 30)`)
				  .attr("fill", "black")
				  .text(d => d);

		svgElement.select("#yAxis")
				  .call(d3.axisLeft(yScale).ticks(5))
				  .attr("transform", `translate(${layout.marginLeft}, 0)`);

		svgElement.select("#yAxis").selectAll("#yTitle")
				  .data(["PM2.5 Index"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d)

		let lineFunction = d3.line()
							 .x(d => xScale(d["Day"]))
							 .y(d => yScale(d[" PM2_5"]));

		let lines = svgElement.select("#mark")
							.selectAll(".airLine")
							.data([data])
							.join("path")
							.attr("class", "airLine")
							.attr('fill', 'none')
							.attr('stroke-width', 1.5)
							.attr("stroke", "steelblue")
							.attr("d", d => {
								return lineFunction(d)
							});

		/*
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		*/

		const domain = [[0, 150], [150, 300], [300, 450]]

		const colorScale = d3.scaleOrdinal(domain, ["green", "orange", "red"])

		const ranges = domain.map(domain => 
				new Range(
					" PM2_5", 
					domain, 
					"closed", 
					{ 
						"rect": { 
							"fill": colorScale(domain)
						}
					}
				)
				.include({ name: ["rect", "text"] })
		);

		const rangeUnion = ranges[0].union(ranges.slice(1));

		console.log(rangeUnion)

		const draft = new Draft();

		draft
			.layer(ref.current)
			.select("rect")
			.x("Day", xScale)
			.y(" PM2_5", yScale)
			.augment(rangeUnion)

	}, [data])

	return (
		<div>
			<svg id="svg" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
				<g id="legend" />
			</svg>
		</div>
	)
}

Task3.story = {
  name: 'Task3',
};