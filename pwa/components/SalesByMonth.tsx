import React, {useEffect} from 'react';
import * as d3 from "react-d3-components";
var BarChart = d3.BarChart;
export const SalesByMonth: () => JSX.Element = () => {

  var data = [{
    label:'somethingA',
    values:[{x:'SomethingA',y:10},{x:'SomethingB',y:4},{x:'SomethingC',y:3}]
  }];
  return (
    <BarChart
      data={data}
      width={600}
      height={300}
      margin={{top:10,bottom:50,left:50,right:10}}/>
  )
}

