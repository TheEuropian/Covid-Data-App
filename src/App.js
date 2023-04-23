import React, { useState, useEffect, useMemo, useCallback } from "react";
import DateRangeComp from "./components/DateRangeComp";
import CountrySelector from "./components/CountrySelector";
import Viewer from "./components/Viewer";
import moment from "moment";
import CovidData from "./components/Data";
import "./App.css";


const App = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All_countries");
  const [dateRange, setDateRange] = useState({ 
  startDate: moment("2019-12-31"),
  endDate: moment("2020-12-31"),
});

  useEffect(() => {
    const fetchData = async () => {
      const result = await CovidData();
      setData(result);
    };
    fetchData();
  }, []);

  const filterData = useCallback((country, dateRange) => {
    let filtered = data;
    if (country) {
      if (country === "All_countries") {
        filtered = filtered.filter(
          (item) => item.countriesAndTerritories === country
        );
      } else {
        filtered = filtered.filter(
          (item) => item.countriesAndTerritories === country
        );
      }
    }

    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((item) =>
        moment(item.date).isBetween(
          dateRange.startDate,
          dateRange.endDate,
          "[]"
        )
      );
    }

    setFilteredData(filtered);
  }, [data]);


  useEffect(() => {
    filterData(selectedCountry, dateRange);
  }, [data, selectedCountry, dateRange, filterData]);

  const handleCountryChange = useCallback(
    (event) => {
      const country = event.target.value;
      setSelectedCountry(country);
      filterData(country, dateRange);
    },
    [filterData, dateRange]
  );

  const handleDateChange = useCallback(
    (startDate, endDate) => {
      setDateRange({ startDate, endDate });
      filterData(selectedCountry, { startDate, endDate });
    },
    [filterData, selectedCountry]
  );

  const countries = useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(data.map((item) => item.countriesAndTerritories))
    );
    const sortedCountries = uniqueCountries.sort();
    const index = sortedCountries.indexOf("All_countries");
    if (index > -1) {
      sortedCountries.splice(index, 1);
    }
    return ["All_countries", ...sortedCountries];
  }, [data]);


  return (
    <div className="App">
      <h1>Covid Data Visualizer</h1>
      <DateRangeComp
        onDatesChange={handleDateChange}
        minDate={new Date("2019-12-31")} 
        maxDate={new Date("2020-12-31")} 
      />

      <CountrySelector
        countries={countries}
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
      />
      <Viewer selectedCountry={selectedCountry} filteredData={filteredData || []} />
    </div>
  );
};

export default App;
