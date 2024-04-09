import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

// data from https://www.kaggle.com/datasets/berkeleyearth/climate-change-earth-surface-temperature-data
import gapminder from "../../public/chartaccent_gapminder.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Aug/ChartAccent/Task2',
};

export const Task2 = () => {

	const ref = useRef("task2");

	let layout={"width":1200,
	   		   "height":700,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	const [data, setData] = useState(gapminder);

	useEffect(() => {

		let svgElement = d3.select(ref.current);

		svgElement.attr("width", layout.width)
				.attr("height", layout.height);

		let xScale = d3.scaleLinear()
					.domain([0, d3.max(data, d => d["FertilityRate"])])
					.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleLinear()
					.domain([d3.min(data, d => d["LifeExpectancy"]), 88])
					.range([layout.height - layout.marginBottom, layout.marginTop]);

		let regions = Array.from(new Set(data.map(d => d.Region)));

		let colorScale = d3.scaleOrdinal(d3.schemeSet2)
							.domain(regions);

		let sizeScale = d3.scaleLinear()
					.domain(d3.extent(data, d => d["Population"]))
					.range([3, 20]);							

		svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
				  .data(["Fertility Rate"])
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
				  .data(["Life Expectancy"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d)

		let legend = svgElement.select("#legend")
							.selectAll(".legendCircle")
							.data(regions)
							.join("circle")
							.attr("class", "legendCircle")
							.attr("cx", (d, i) => layout.width - 150)
							.attr("cy", (d, i) => layout.marginTop + 16 * i)
							.attr("r", 5)
							.attr("fill", d => colorScale(d))

		let legendText = svgElement.select("#legend")
							.selectAll(".legendText")
							.data(regions)
							.join("text")
							.attr("class", "legendText")
							.attr("x", (d, i) => layout.width - 150 + 16)
							.attr("y", (d, i) => layout.marginTop + 16 * i + 3)
							.attr("fill", "black")
							.attr("text-anchor", "start")
							.attr("font-family", "sans-serif")
							.attr("font-size", "10")
							.text(d => d)

		let scatterpoints = svgElement.select("#mark")
							.selectAll(".scatterpoints")
							.data(data)
							.join("circle")
							.attr("class", d => `scatterpoints`)
							.attr("cx", d => xScale(d.FertilityRate))
							.attr("cy", d => yScale(d.LifeExpectancy))
							.attr("r", d => sizeScale(d.Population))
							.attr('fill', d => colorScale(d.Region));

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

Task2.story = {
  name: 'Task2',
};