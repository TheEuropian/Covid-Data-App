import React, {useState, useEffect} from 'react';
import { CovidData } from "./components/Data";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await CovidData();
        setData(result);
      };
      fetchData();
    }, []);

    return (
        <div>
          {data.map(item => (
            <div key={item.id}>
              
              {item.id}{item.countriesAndTerritories}      {item.cases}  {item.deaths}  {item.allCases}  {item.allDeaths} {item.casesOn1000} {item.deathsOn1000}
          
            </div>
          ))}
        </div>
      );
    }
export default App;