require('./index.scss')

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json', d => {
  plot(d)
})

const plot = (data) => {

  const margin = { top: 120, right: 20, bottom: 60, left: 90 }

  const width = 1200 - margin.right - margin.left,
        height = 600 - margin.top - margin.bottom

  const middleX = (margin.left + width + margin.right) / 2
  
  const baseTemp = data.baseTemperature
  data = data.monthlyVariance

  const months = [ 'January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December' ]

  // Colors from http://colorbrewer2.org
  const colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"]
  const colorScale = d3.scaleQuantize()
    .domain(d3.extent(data, d => d.variance))
    .range(colors)

  console.log('min temp: ' + (baseTemp + d3.min(data, d => d.variance)))
  console.log('max temp: ' + (baseTemp + d3.max(data, d => d.variance)))

  const xScale = d3.scaleBand()
    .domain(d3.range(d3.min(data, d => d.year), d3.max(data, d => d.year) + 1))
    .range([0, width])

  const yScale = d3.scaleBand()
    .domain(d3.range(1, 13))
    .range([0, height])

  const svg = d3.select('#chart').append('svg').classed('center-block', true)
    .attr('width', margin.left + width + margin.right)
    .attr('height', margin.top + height + margin.bottom)

  const grid = svg.append('g').classed('grid', true)
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    .selectAll('rect')
    .data(data).enter()
    .append('rect').classed('cell', true)
    .attr('transform', d => {
      return 'translate(' + xScale(d.year) + ', ' + yScale(d.month) + ')'
    })
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .style('fill', d => colorScale(d.variance))

  let hScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, width])

  const tickValues = data.map(d => d.year).filter((d, i, arr) => d % 10 === 0 && arr.indexOf(d) === i)
  console.log(tickValues)

  let hAxis = d3.axisBottom(hScale)
    .tickValues(tickValues)
  svg.append('g').classed('h-axis', true)
    .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height) + ')')
    .call(hAxis)

  let vAxis = d3.axisLeft(yScale)
    .tickFormat(d => months[d-1])
  svg.append('g').classed('v-axis', true)
    .attr('transform', 'translate(' + margin.left+ ', ' + margin.top + ')')
    .call(vAxis)

}
