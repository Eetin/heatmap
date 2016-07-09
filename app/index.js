require('./index.scss')

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json', d => {
  plot(d)
})

const plot = (data) => {

  const margin = { top: 120, right: 120, bottom: 60, left: 60 }

  const width = 900 - margin.right - margin.left,
        height = 600 - margin.top - margin.bottom

  const middleX = (margin.left + width + margin.right) / 2

  

}