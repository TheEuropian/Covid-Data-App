import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

function Graph({ data, selectedCountry }) {
  // Filter data based on selected country and time range
  const filteredData = useMemo(() => {
    let dataToFilter = data.filter((item) => {
      if (selectedCountry === "Afganistan") return true;
      return item.countriesAndTerritories === selectedCountry;
    });



    return dataToFilter;
  }, [data, selectedCountry]);

  const series = [
    {
      name: "Cases",
      data: filteredData.map((item) => item.allCases),
    },
    {
      name: "Deaths",
      data: filteredData.map((item) => item.allDeaths),
    },
  ];

  const xaxisCategories = filteredData.map((item) => item.isoDateString);

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
        format: "dd/MM/yyyy",
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
