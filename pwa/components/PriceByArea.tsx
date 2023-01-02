import React, {useEffect, useState} from 'react';
import * as d3 from "react-d3-components";
var LineChart = d3.LineChart;
export const PriceByArea: () => any = () => {
  const [year, setYear] = React.useState(2018);
  const [data, setData] = React.useState([{
      label:'somethingA',
      values:[{x:'SomethingA',y:10},{x:'SomethingB',y:4},{x:'SomethingC',y:3}]}]);

  function handleClick(e) {
    setYear(e);
    fetchData(year);
  }

  useEffect(() => {
    async function getData(year){

      await fetchData(year).then((response) => {
        return response.json();
      }).then((json) => {
        let lejson = json["hydra:member"];
        console.log(lejson);
        setData([{ label:'somethingA', values:lejson}]);
      })

    }

    getData(year);
  },[])

  return (
    <div>
      <div>
        <button onClick={() => handleClick(2018)} value="2018">2018</button>
        <button onClick={() => handleClick(2019)} value="2019">2019</button>
        <button onClick={() => handleClick(2020)} value="2020">2020</button>
        <button onClick={() => handleClick(2021)} value="2021">2021</button>
      </div>

      <LineChart
      data={data}
      width={900}
      height={300}
      margin={{top:50,bottom:50,left:100,right:50}}/>
    </div>
  )
}

const fetchData = async function (year) {
  let res = await fetch("https://localhost/pricebyarea/"+ year);
  return res;
}

