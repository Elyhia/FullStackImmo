import React, {useEffect} from 'react';


const dim = {
  width: 1000,
  height: 600,
  margin: 40
}

export const SalesByRegion: () => JSX.Element = () => {

  const svg = d3.select("#donut_chart")
    .attr("width", dim.width)
    .attr("height", dim.height)
    .append("g")
    .attr("transform", "translate(" + dim.width / 2 + "," + dim.height / 2 + ")");

  return (

    <div id="chart">

    </div>
  )
}

