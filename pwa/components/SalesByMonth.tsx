import React, {useEffect, useState} from 'react';
import * as d3 from "react-d3-components";
var BarChart = d3.BarChart;
export const SalesByMonth: () => any = () => {
  const [year, setYear] = React.useState(2018);
  const [data, setData] = React.useState([{
    label:'somethingA',
    values:[{x:'SomethingA',y:10},{x:'SomethingB',y:4},{x:'SomethingC',y:3}]}]);

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
  },[year])

  function handleClick(e) {
    console.log("Changement année");
    setYear(e);
  }

  return (
    <div>
      <div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary">
            <input hidden type="radio" name="options" id="option1" onClick={() => handleClick(2018)} value="2018" />2018
          </label>
          <label className="btn btn-secondary">
            <input hidden type="radio" name="options" id="option2" onClick={() => handleClick(2019)} value="2019" />2019
          </label>
          <label className="btn btn-secondary">
            <input hidden type="radio" name="options" id="option3" onClick={() => handleClick(2020)} value="2020"/>2020
          </label>
        </div>


      </div>

      <BarChart
        data={data}
        width={900}
        height={300}
        margin={{top:50,bottom:50,left:100,right:50}}/>
    </div>
  )
}

const fetchData = async function (year) {
  let res = await fetch("https://localhost/countbymonth/"+ year + "-01/" + year + "-12");
  return res;
}

