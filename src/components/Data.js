
import axios from 'axios';



export const CovidData = async () => {

  const response = await axios.get('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/');

  
     

       const isoData = response.data.records.map((item) => {
          const date = item.dateRep.split("/").reverse().join('-');
         
       
        
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

        // Add an id to each element in the array
        const dataWithIndex = sortedData.map((item) => {
          const casesOn1000 = ((item.cases/ item.popData2019) *1000).toFixed(5);
          const deathsOn1000 = ((item.deaths/ item.popData2019) *1000).toFixed(5);
         const id = item.date + item.geoId;
          return { ...item, id, casesOn1000, deathsOn1000};
        });


        let allCases = {};
        let allDeaths = {};
       
        
        const allCasesDeathsByCountry = dataWithIndex.map(( item) => {          
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
        }, {})



      

        const allCountries = {};
        
          for (let i = 0; i<allCasesDeathsByCountry.length; i++){
            const item = allCasesDeathsByCountry[i];
            const { date, cases, deaths, allCases, allDeaths, casesOn1000, deathsOn1000} = item;

            if(!allCountries[date]){
              allCountries[date] = {
                id: "",
                cases: 0,
                deaths:0,
                allCases:0,
                allDeaths:0,
                casesOn1000:0,
                deathsOn1000:0

              }
              allCountries[date].id = date ? date + "all" : "all";
              allCountries[date].cases += cases;
              allCountries[date].deaths += deaths;
              allCountries[date].allCases += allCases;
              allCountries[date].allDeaths += allDeaths;
              allCountries[date].casesOn1000 += casesOn1000;
              allCountries[date].deathsOn1000 += deathsOn1000}
        
      };

      const allDataArray=Object.values(allCountries).map((item)=>{
        const id = item.id;
          return { ...item, id};
      });

      const allData = allCasesDeathsByCountry.slice();  
      allData.unshift(allDataArray);

      console.log(allDataArray);

      
       
        
  return allData;
};