import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

// data from https://www.kaggle.com/datasets/berkeleyearth/climate-change-earth-surface-temperature-data
import temperature from "../../public/chartaccent_temperature.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Aug/ChartAccent/Task5',
};

export const Task5 = () => {

	const ref = useRef("task5");

	const cities = ["Philadelphia", "Phoenix", "Caquetania"];
	let flatten = [];

	for (let c of cities) {
		flatten = flatten.concat(temperature.map(d => {
			let newRow = {};
			newRow.city = c;
			newRow.temperature = d[c];
			newRow.month = d.Month;

			return newRow
		}))
	}

	const [data, setData] = React.useState(flatten);

	let layout={"width":1200,
	   		   "height":700,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	useEffect(() => {

		let svgElement = d3.select(ref.current);

		let grouped = d3.group(data, d => d.city);

		let flattenGroup = [...grouped].map(d => {
			return d[1].map(di => {di.city = d[0]; return di});
			return d[1]
		});

		svgElement.attr("width", layout.width)
				.attr("height", layout.height);

		let xScale = d3.scalePoint()
					.domain(data.map(d => d["month"]))
					.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleLinear()
					.domain([0, 100])
					.range([layout.height - layout.marginBottom, layout.marginTop]);

		let colorScale = d3.scaleOrdinal()
							.domain(cities)
							.range(["#9cc957", "#fa962a", "#4d9be3"]);

		svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
				  .data(["Month"])
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
				  .data(["Temperature"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d)

		let lineFunction = d3.line()
							 .x(d => xScale(d["month"]))
							 .y(d => yScale(d["temperature"]));

		let legend = svgElement.select("#legend")
							.selectAll(".legendCircle")
							.data(cities)
							.join("circle")
							.attr("class", "legendCircle")
							.attr("cx", (d, i) => layout.width - 100)
							.attr("cy", (d, i) => layout.marginTop + 16 * i)
							.attr("r", 5)
							.attr("fill", d => colorScale(d))

		let legendText = svgElement.select("#legend")
							.selectAll(".legendText")
							.data(cities)
							.join("text")
							.attr("class", "legendText")
							.attr("x", (d, i) => layout.width - 100 + 16)
							.attr("y", (d, i) => layout.marginTop + 16 * i + 3)
							.attr("fill", "black")
							.attr("text-anchor", "start")
							.attr("font-family", "sans-serif")
							.attr("font-size", "10")
							.text(d => d)

		let lines = svgElement.select("#mark")
							.selectAll(".climateLine")
							.data(flattenGroup)
							.join("path")
							.attr("class", "climateLine")
							.attr('fill', 'none')
							.attr('stroke-width', 1.5)
							.attr("stroke", d => colorScale(d[0].city))
							.attr("d", d => {
								return lineFunction(d)
							});

		let scatterpoints = svgElement.select("#mark")
							.selectAll(".climatePoints")
							.data(data)
							.join("circle")
							.attr("class", "climatePoints")
							.attr("id", (d, i) => i)
							.attr("cx", d => xScale(d.month))
							.attr("cy", d => yScale(d.temperature))
							.attr("r", 3)
							.attr("fill",  d => colorScale(d.city))
							.attr("stroke", d => colorScale(d.city))
							.attr("cursor", "pointer");

		/*
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		*/

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

Task5.story = {
  name: 'Task5',
};