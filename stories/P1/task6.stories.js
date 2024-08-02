import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { Draft, Threshold, Emphasis, Regression } from "auteur"

// data from https://www.kaggle.com/datasets/berkeleyearth/climate-change-earth-surface-temperature-data
import temperature from "../../public/chartaccent_temperature.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Aug/P1/Task6',
};

export const Task6 = () => {

	const ref = useRef("Task6");
	const draft = useRef(new Draft());
	const regression = useRef(new Regression());

	const cities = ["Philadelphia"];
	const [data, setData] = React.useState(temperature);

	let layout = {
		"width": 1200,
		"height": 700,
		"marginTop": 50,
		"marginRight": 50,
		"marginBottom": 50,
		"marginLeft": 50
	};

	useEffect(() => {

		let svgElement = d3.select(ref.current);

		svgElement.attr("width", layout.width)
			.attr("height", layout.height);

		let xScale = d3.scaleBand()
			.domain(data.map(d => d["Month"]))
			.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleLinear()
			.domain([0, d3.max(data, d => d.Philadelphia)])
			.range([layout.height - layout.marginBottom, layout.marginTop]);

		let colorScale = d3.scaleOrdinal(d3.schemePastel2)
			.domain(cities);

		let lineFunctions = {};

		svgElement.select("#xAxis")
			.call(d3.axisBottom(xScale))
			.attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
			.data(["Month"])
			.join("text")
			.attr("id", "xTitle")
			.attr("text-anchor", "middle")
			.attr("transform", `translate(${layout.width / 2}, 30)`)
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

		let firstHalf = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

		let bars = svgElement.select("#mark")
			.selectAll(".climateBar")
			.data(data)
			.join("rect")
			.attr("class", d => `climateBar ${firstHalf.indexOf(d.Month) < 0 ? "second" : "first"}`)
			.attr("x", d => xScale(d["Month"]) + 1)
			.attr("y", d => yScale(d["Philadelphia"]))
			.attr("width", xScale.bandwidth() - 2)
			.attr("height", d => yScale(0) - yScale(d["Philadelphia"]))
			.attr('fill', '#a9cfd6');

		svgElement.select("#augs")
			.attr("transform", `translate(${xScale.bandwidth() / 2}, 0)`);

		/*
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		ADD AUTEUR CODE HERE
		*/
		let color = d3.scaleOrdinal()
			.domain(['first', 'second'])
			.range(["red", "green"]);
		['first', 'second'].forEach(y => {
			draft.current.layer(ref.current)
				.x("Month", xScale)
				.y("Philadelphia", yScale)
				.augment(regression.current.getAugs());
			let barSelection = svgElement.selectAll(`.climateBar.${y}`)
			const barStyle = { "regression": { "transform":`translate(${xScale.bandwidth()/2}, 0)`, "stroke": color(y), "stroke-width": "2px", "stroke-opacity": 0.5 } };
			let carRegression = new Regression();
			carRegression.updateStyles(barStyle).selection(barSelection);
			draft.current.augment(carRegression.getAugs());
		}
		)
		
		const newEmphasis = new Emphasis("Philadelphia", "").selection(bars);
		newEmphasis.updateStyles({"label": { "transform":`translate(${xScale.bandwidth()/2}, 0)` }})
		draft.current.layer(ref.current)
			.x("Month", xScale)
			.y("Philadelphia", yScale)
			.include({ "name": ["label"] })
			.augment(newEmphasis.getAugs());

	}, [data])

	return (
		<div>
			<svg id="svg" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
				<g id="augs" />
				<g id="legend" />
			</svg>
		</div>
	)
}

Task6.story = {
	name: 'Task6',
};