/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json', function (d) {
	  plot(d);
	});
	
	var plot = function plot(data) {
	
	  var margin = { top: 120, right: 10, bottom: 60, left: 80 };
	
	  var width = 1200 - margin.right - margin.left,
	      height = 600 - margin.top - margin.bottom;
	
	  var middleX = (margin.left + width + margin.right) / 2;
	
	  var baseTemp = data.baseTemperature;
	  data = data.monthlyVariance;
	
	  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	  // Colors from http://colorbrewer2.org
	  var colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];
	  var colorScale = d3.scaleQuantize().domain(d3.extent(data, function (d) {
	    return d.variance;
	  })).range(colors);
	
	  console.log('min temp: ' + (baseTemp + d3.min(data, function (d) {
	    return d.variance;
	  })));
	  console.log('max temp: ' + (baseTemp + d3.max(data, function (d) {
	    return d.variance;
	  })));
	
	  var xScale = d3.scaleBand().domain(d3.range(d3.min(data, function (d) {
	    return d.year;
	  }), d3.max(data, function (d) {
	    return d.year;
	  }) + 1)).range([0, width]);
	
	  var yScale = d3.scaleBand().domain(d3.range(1, 13)).range([0, height]);
	
	  var svg = d3.select('#chart').append('svg').attr('width', margin.left + width + margin.right).attr('height', margin.top + height + margin.bottom);
	
	  var grid = svg.append('g').classed('grid', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').selectAll('rect').data(data).enter().append('rect').classed('cell', true).attr('transform', function (d) {
	    return 'translate(' + xScale(d.year) + ', ' + yScale(d.month) + ')';
	  }).attr('width', xScale.bandwidth()).attr('height', yScale.bandwidth()).style('fill', function (d) {
	    return colorScale(d.variance);
	  });
	
	  var vAxis = d3.axisLeft(yScale).tickFormat(function (d) {
	    return months[d - 1];
	  });
	  svg.append('g').classed('v-axis', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').call(vAxis);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map