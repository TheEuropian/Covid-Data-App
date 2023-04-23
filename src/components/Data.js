

import axios from 'axios';



const CovidData = async () => {
  const response = await axios.get('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/');

  
     

       const isoData = response.data.records.map((item) => {
       const date = item.dateRep.split("/").reverse().join("-");
         
   
            return { ...item, date  };
          });


        const sortedData = isoData.sort((a, b) => {
          if (a.countriesAndTerritories < b.countriesAndTerritories) {
            return -1;
          }
          if (a.countriesAndTerritories > b.countriesAndTerritories) {
            return 1;
          }
        
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
         
        });

       
        const dataWithIndex = sortedData.map((item) => {
          let casesOn1000, deathsOn1000;

//To solve Cases_on_an_international_conveyance_Japan casesOn1000 NaN (if statement)

          if (!item.hasOwnProperty('popData2019') || item.popData2019 === null) {
            casesOn1000 = 0;
            deathsOn1000 = 0;
          } else {
            casesOn1000 = ((item.cases / item.popData2019) * 1000).toFixed(5);
            deathsOn1000 = ((item.deaths / item.popData2019) * 1000).toFixed(5);
          }
           // Add an id to each element in the array
         const id = item.date + item.geoId;
          return { ...item, id, casesOn1000, deathsOn1000};
        });


        let allCases = {};
        let allDeaths = {};
        
        

        const allData = dataWithIndex.map(( item) => {          
          const country = item.countriesAndTerritories;
          const cases = item.cases;
          const deaths = item.deaths;
       

          if (allCases[country]){
            allCases[country]+= cases;
            allDeaths[country]+= deaths;
          }else{
            allCases[country]= cases;
            allDeaths[country]= deaths;
          }
          item.allCases = allCases[country];
          item.allDeaths = allDeaths[country];


          return { ...item, allCases: allCases[country], allDeaths: allDeaths[country] };
        },{})
        // here we need to create a new object allCountries.

        const allCountries = allData.reduce((accumulator, item) => {
          const date = item.date;
        
          if (!accumulator[date]) {
            accumulator[date] = {
              date,
              cases: 0,
              deaths: 0,
              allCases: 0,
              allDeaths: 0,
              casesOn1000: 0,
              deathsOn1000: 0,
              id: date + "All_countries",
              countriesAndTerritories: "All_countries"
            };
          }
        
          accumulator[date].cases += item.cases;
          accumulator[date].deaths += item.deaths;
          accumulator[date].allCases += item.allCases;
          accumulator[date].allDeaths += item.allDeaths;
          accumulator[date].casesOn1000 = parseFloat((accumulator[date].casesOn1000 + parseFloat(item.casesOn1000)).toFixed(5));
          accumulator[date].deathsOn1000 = parseFloat((accumulator[date].deathsOn1000 + parseFloat(item.deathsOn1000)).toFixed(5));
        
          return accumulator;
        }, {});
        const allCountriesArray = Object.values(allCountries);

        allCountriesArray.sort((a, b) => {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        });

        allCountriesArray.forEach(countryData => {
          allData.push(countryData);
        });
        allData.sort((a, b) => {
          if (a.countriesAndTerritories === "All_countries") return -1;
          if (b.countriesAndTerritories === "All_countries") return 1;
          return 0;
        });
       

        allData.unshift(allCountriesArray);

        return allData;
      };

      export default CovidData;
