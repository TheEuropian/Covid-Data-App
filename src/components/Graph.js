import React from "react";
import ReactApexChart from "react-apexcharts";

function Graph({ data }) {
  const series = [
    {
      name: "Cases",
      data: data.map((item) => item.allCases),
    },
    {
      name: "Deaths",
      data: data.map((item) => item.allDeaths),
    },
  ];

  const xaxisCategories = data.map((item) => item.date);

  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: xaxisCategories,
    },
    tooltip: {
      x: {
        format: "yyyy/mm/dd",
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
}

export default Graph;
