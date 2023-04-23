import React, { useState } from 'react';
import Table from './Table';
import Graph from './Graph';
import './viewer.css';

const Viewer = ({filteredData}) => {
  const [activeView, setActiveView] = useState('table');

  const toggleView = (view) => {
    setActiveView(view);
  };

  return (
    <>
      <div className="view-buttons">
        <button
          className={`btn ${activeView === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => toggleView('table')}
        >
          Table
        </button>
        <button
          className={`btn ${activeView === 'graph' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => toggleView('graph')}
        >
          Graph
        </button>
      </div>
      {activeView === 'table' ? (
        <Table data={filteredData}/>
      ) : (
        <Graph data={filteredData}/>
      )}
    </>
  );
};

export default Viewer;