require('./index.scss')

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json', d => {
  plot(d)
})

const plot = (data) => {

  const margin = { top: 120, right: 35, bottom: 100, left: 105 }

  const width = 1200 - margin.right - margin.left,
        height = 600 - margin.top - margin.bottom

  const middleX = (margin.left + width + margin.right) / 2

  const legendWidth = 400,
        legendHeight = 20,
        legendOffset = 40

  const tooltipWidth = 130,
        tooltipHeight = 80

  const baseTemp = data.baseTemperature
  data = data.monthlyVariance

  const months = [ 'January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December' ]

  // Colors from http://colorbrewer2.org
  const colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"]
  const colorScale = d3.scaleQuantile()
    .domain(d3.extent(data, d => d.variance))
    .range(colors)

  const legendScale = d3.scaleQuantile()
    .domain(d3.extent(data, d => d.variance))
    .range(d3.range(0, legendWidth, legendWidth / 11))

  const legendTickScale = d3.scaleBand()
    .domain(legendScale.range().map(d => {
      const quantiles = legendScale.invertExtent(d)
      return ((quantiles[0] + quantiles[1]) / 2 + baseTemp).toFixed(1)
    }))
    .range([0, legendWidth])

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
    .on('mouseover', function(d) {
      tooltipDate.text(() => months[d.month - 1] + " " + d.year)
      tooltipTemperature.text(() => 'Temp: ' + (baseTemp + d.variance).toFixed(3) + '℃')
      tooltipVariance.text(() => 'Variance: ' + d.variance.toFixed(3) + '℃')
      let mousePosition = d3.mouse(svg.node())
      tooltip
        .attr('transform', 'translate(' + (mousePosition[0] - tooltipWidth + margin.right - 5) + ', ' + (mousePosition[1] - tooltipHeight - 5) + ')')
        .transition()
        .style('opacity', 1)
    })
    .on('mouseout', function(d) {
      tooltip.transition()
        .style('opacity', 0)
    })

  const hScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, width])

  const tickValues = data.map(d => d.year).filter((d, i, arr) => d % 10 === 0 && arr.indexOf(d) === i)

  const hAxis = d3.axisBottom(hScale)
    .tickValues(tickValues)
  svg.append('g').classed('h-axis', true)
    .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height) + ')')
    .call(hAxis)

  const vAxis = d3.axisLeft(yScale)
    .tickFormat(d => months[d-1])
  svg.append('g').classed('v-axis', true)
    .attr('transform', 'translate(' + margin.left+ ', ' + margin.top + ')')
    .call(vAxis)

  const legend = svg.append('g').classed('legend', true)
    .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height + legendOffset) + ')')
    .selectAll('rect')
    .data(data).enter()
    .append('rect').classed('legend-cell', true)
    .attr('width', legendWidth / 11)
    .attr('height', legendHeight)
    .style('fill', d => colorScale(d.variance))
    .attr('transform', d => 'translate(' + (width - legendWidth + legendScale(d.variance)) + ', 0)')

  const heading = svg.append('g').classed('heading', true)
    .attr('transform', 'translate(' + (margin.left + width + margin.right) / 2 + ', 0)')
    .attr('text-anchor', 'middle')
  heading.append('text').classed('h1 center-block', true)
    .attr('transform', 'translate(0, 45)')
    .text('Monthly Global Land-Surface Temperature')
  heading.append('text').classed('h2 center-block', true)
    .attr('transform', 'translate(0, 75)')
    .text('1753 - 2015')
  heading.append('text').classed('center-block', true)
    .attr('transform', 'translate(0, 95)')
    .text('Temperatures are in Celsius and reported as anomalies relative to the Jan 1951 - Dec 1980 average.')
  heading.append('text').classed('center-block', true)
    .attr('transform', 'translate(0, 110)')
    .text('Estimated Jan 1951-Dec 1980 absolute temperature: 8.66℃ +/- 0.07℃')

  const legendAxis = d3.axisBottom(legendTickScale)
  svg.append('g').classed('legend-axis', true)
    .attr('transform', 'translate(' + (margin.left + width - legendWidth) + ', '
      + (margin.top + height + legendOffset + legendHeight) + ')')
    .call(legendAxis)

  const tooltip = svg.append('g').classed('tooltip', true)
    .style('opacity', 0)

  tooltip.append('rect').classed('tooltip-rect', true)
    .attr('width', tooltipWidth)
    .attr('height', tooltipHeight)
    .attr('rx', 10)
    .attr('ry', 10)

  const tooltipDate = tooltip.append('text').classed('tooltip-text', true)
    .attr('x', tooltipWidth / 2)
    .attr('y', '1.5em')
    .attr('text-anchor', 'middle')

  const tooltipTemperature = tooltip.append('text').classed('tooltip-text', true)
    .attr('x', tooltipWidth / 2)
    .attr('y', '3em')
    .attr('text-anchor', 'middle')

  const tooltipVariance = tooltip.append('text').classed('tooltip-text', true)
    .attr('x', tooltipWidth / 2)
    .attr('y', '4.5em')
    .attr('text-anchor', 'middle')

}
