import React, {useEffect} from 'react';
import * as d3 from "react-d3-components";
var LineChart = d3.LineChart;
export const PriceByArea: () => JSX.Element = () => {

  var data = [{
    label:'somethingA',
    values:[{x:'SomethingA',y:10},{x:'SomethingB',y:4},{x:'SomethingC',y:3}]
  }];
  return (
    <LineChart
      data={data}
      width={800}
      height={400}
      margin={{top:10,bottom:50,left:50,right:10}}/>
  )
}

