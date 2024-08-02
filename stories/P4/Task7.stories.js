import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";
import * as autr from "auteur";

// data from https://www.kaggle.com/datasets/berkeleyearth/climate-change-earth-surface-temperature-data
import temperature from "../../public/chartaccent_temperature.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Aug/P4/Task7',
};

export const Task7 = () => {

	const ref = useRef("Task7");

	const cities = ["NewYork", "Charlotte", "Seattle"];

	const [data, setData] = React.useState(temperature);

	let layout={"width":1200,
	   		   "height":700,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	useEffect(() => {

		let svgElement = d3.select(ref.current);

		svgElement.attr("width", layout.width)
				.attr("height", layout.height);

		let xScale = d3.scaleBand()
					.domain(data.map(d => d["Month"]))
					.range([layout.marginLeft, layout.width - layout.marginRight]);

		let padding = 5;
		let bandwidth = (xScale.bandwidth() - padding * 2) / 3;

		let yScale = d3.scaleLinear()
					.domain([0, 100])
					.range([layout.height - layout.marginBottom, layout.marginTop]);

		let colorScale = d3.scaleOrdinal()
							.domain(cities)
							.range(["#4d9be3", "#9cc957" , "#fa962a"]);

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
				  .text(d => d);

		let legend = svgElement.select("#legend")
							.selectAll(".legendCircle")
							.data(cities)
							.join("circle")
							.attr("class", "legendCircle")
							.attr("cx", (d, i) => layout.width - 100)
							.attr("cy", (d, i) => layout.marginTop + 16 * i)
							.attr("r", 5)
							.attr("fill", d => colorScale(d));

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
							.text(d => d);

		let NYBars = svgElement.select("#mark")
							.selectAll(".temperatureNY")
							.data(data)
							.join("rect")
							.attr("class", "temperatureNY")
							.attr('fill', d => colorScale("NewYork"))
							.attr("x", d => xScale(d.Month) + padding)
							.attr("y", d => yScale(d["NewYork"]))
							.attr("width", bandwidth)
							.attr("height", d => yScale(0) - yScale(d["NewYork"]))
							.attr("opacity", 0.25);

		let CharlotteBars = svgElement.select("#mark")
							.selectAll(".temperatureCharlotte")
							.data(data)
							.join("rect")
							.attr("class", "temperatureCharlotte")
							.attr('fill', d => colorScale("Charlotte"))
							.attr("x", d => xScale(d.Month) + bandwidth + padding)
							.attr("y", d => yScale(d["Charlotte"]))
							.attr("width", bandwidth)
							.attr("height", d => yScale(0) - yScale(d["Charlotte"]))
							.attr("opacity", 0.25);

		let SeattleBars = svgElement.select("#mark")
							.selectAll(".temperatureSeattle")
							.data(data)
							.join("rect")
							.attr("class", "temperatureSeattle")
							.attr('fill', d => colorScale("Seattle"))
							.attr("x", d => xScale(d.Month) + bandwidth * 2 + padding)
							.attr("y", d => yScale(d["Seattle"]))
							.attr("width", bandwidth)
							.attr("height", d => yScale(0) - yScale(d["Seattle"]))
							.attr("opacity", 0.25);

		/*
		ADD AUTEUR CODE HERE
		*/

		// Frankly, it took me some time to understand whose mean to take and what to put on y. After some trial and error, I figured its NewYork's! This kind of information could be shared with the user/developer.
		const draft = new autr.Draft();
		draft
			.layer(ref.current)
			.select(".temperatureCharlotte, .temperatureSeattle") // select Charlotte and Seattle
			.x("Month", xScale)
			.y("NewYork", yScale)
			.include({ name: ["line", "opacity", "stroke", "text"] }) // From an Auteur standpoint, I know what'll help me get there but there...but terms like 'text', 'line', 'stroke', 'opacity' are probably too generic? Because what about the stroke of the text? or opacity of the line? You know, things like that.
			.augment(new autr.Threshold("NewYork", "mean", "geq").getAugs());

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

Task7.story = {
  name: 'Task7',
};