import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Header = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  return (
    <div className="header">
      <Button variant="outline-primary" size="sm" onClick={handleFromDateChange}>
        From
      </Button>
      <input type="date" value={fromDate} onChange={handleFromDateChange} />

      <Button variant="outline-primary" size="sm" onClick={handleToDateChange}>
        To
      </Button>
      <input type="date" value={toDate} onChange={handleToDateChange} />
    </div>
  );
};

export default Header;