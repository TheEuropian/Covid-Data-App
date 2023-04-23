import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangeComp = ({ onDatesChange, minDate, maxDate }) => {
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  const handleDatesChange = (item) => {
    setStartDate(item.selection.startDate);
    setEndDate(item.selection.endDate);
    onDatesChange(item.selection.startDate, item.selection.endDate);
  };

  const dateRangeSelection = {
    startDate,
    endDate,
    key: "selection",
  };

  return (
    <div>
      <DateRangePicker
        ranges={[dateRangeSelection]}
        onChange={handleDatesChange}
        minDate={minDate}
        maxDate={maxDate}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        direction="horizontal"
      />
    </div>
  );
};

export default DateRangeComp;


